
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { faker } from 'https://esm.sh/@faker-js/faker'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
        if (!mistralApiKey) throw new Error('MISTRAL_API_KEY is not set')

        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        if (!supabaseUrl || !supabaseServiceRoleKey) throw new Error('Supabase credentials not set')

        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

        // 1. Generate Random Identity
        // We want realistic names but maybe slightly "anonymized" or just first names + last initial?
        // Or full names. Let's go with Full Names as it looks more natural for a community.
        const randomName = faker.person.fullName();
        const randomAvatarSeed = randomName; // Use name as seed for consistency if we were regenerating

        console.log(`Getting or creating bot: ${randomName}`);

        // 2. Find or Create Profile (and Auth User if needed)
        // We search profiles by full_name. 
        // Since names are random now (infinite space), we likely won't find duplicates, 
        // so we will almost always create a new user. 
        // This supports the "random name" requirement perfectly.

        // Create new Auth User
        // 2. Find or Create Profile (and Auth User if needed)
        // ... (existing user creation logic remains same) ...

        // ... (Creating new bot user logic) ...
        console.log(`Creating new bot user: ${randomName}`);
        const email = `bot_${Date.now()}_${Math.random().toString(36).substring(7)}@example.com`;
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: email,
            password: crypto.randomUUID(),
            email_confirm: true,
            user_metadata: { full_name: randomName }
        });

        if (authError) throw authError;
        const userId = authData.user.id;

        // Create Profile manually
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                full_name: randomName,
                email: email,
                role: 'bot',
                plan: 'free'
            })

        if (profileError) {
            console.error("Error creating profile:", profileError);
            throw profileError;
        }
        console.log(`Created new bot profile: ${userId}`);

        // 3. Fetch Recent Posts to Avoid Duplicates
        const { data: recentPosts } = await supabase
            .from('posts')
            .select('content')
            .order('created_at', { ascending: false })
            .limit(10);

        const recentContent = recentPosts?.map(p => p.content).filter(Boolean) || [];

        // 4. Randomized Topics & Context
        const topics = [
            "Faith in difficult times", "Gratitude for small things", "The power of prayer",
            "Forgiveness", "Serving others", "Hope for the future", "God's promises",
            "Unity in the church", "Overcoming fear", "Joy in the Lord"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        const emotions = ["encouraging", "reflective", "joyful", "compassionate", "resolute"];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

        // 5. Generate Content with Mistral
        let systemPrompt = `You are a helpful, ${randomEmotion} member of a Christian Bible study community using the display name "${randomName}".
    Write a short community post (under 280 characters) about: ${randomTopic}.
    
    Guidelines:
    - Include a Bible verse reference if appropriate (doesn't have to be the whole verse text).
    - Be natural and conversational.
    - Do NOT start with "Here is a post" or quotes.
    - Do strictly NOT use any of the following recent posts content:
    ${recentContent.map(c => `- "${c}"`).join('\n')}
    `;

        const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mistralApiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                temperature: 0.9,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: "Write a unique post now." }
                ]
            })
        });

        const mistralData = await mistralResponse.json();
        if (!mistralResponse.ok) throw new Error(`Mistral API error: ${mistralData.message || 'Unknown error'}`);

        const content = mistralData.choices[0].message.content.trim().replace(/^"|"$/g, '');

        // 6. Insert Post
        const { error: postError } = await supabase
            .from('posts')
            .insert({
                user_id: userId,
                content: content,
                type: 'post'
            });

        if (postError) throw postError;

        return new Response(JSON.stringify({ success: true, message: "Post created", content, author: randomName }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error('Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
