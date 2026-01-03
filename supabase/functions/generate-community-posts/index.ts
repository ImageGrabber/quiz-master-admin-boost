
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
                // We assume avatar_url is handled by UI falling back to DiceBear with seed=full_name
                // If we need to store it explicitly:
                // avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(randomName)}`
            })

        if (profileError) {
            console.error("Error creating profile:", profileError);
            // Try to clean up auth user if profile creation fails? 
            // For now, just throw
            throw profileError;
        }
        console.log(`Created new bot profile: ${userId}`);

        // 3. Generate Content with Mistral
        const systemPrompt = `You are a helpful, encouraging member of a Christian Bible study community using the display name "${randomName}".
    Write a short community post (under 280 characters).
    Topics can be:
    - A short Bible verse (cite it).
    - A brief prayer request or prayer.
    - A word of encouragement.
    - A spiritual thought for the day.
    - "Who wants to join a quiz?" call to action.
    Do NOT include hashtags unless relevant. Do NOT start with "Here is a post:". Just output the content directly.`;

        const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mistralApiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: "Write a post now." }
                ]
            })
        });

        const mistralData = await mistralResponse.json();
        if (!mistralResponse.ok) throw new Error(`Mistral API error: ${mistralData.message || 'Unknown error'}`);

        const content = mistralData.choices[0].message.content.trim().replace(/^"|"$/g, '');

        // 4. Insert Post
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
