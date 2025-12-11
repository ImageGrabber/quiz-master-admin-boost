import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory store for IP turn tracking (resets on function restart)
const ipTurnCounts = new Map<string, number>();
const MAX_TURNS = 10;

const STARTING_THEMES = [
    "The court of King David, dealing with political intrigue and psalms of praise.",
    "The wilderness of the Exodus, facing trials of faith and survival.",
    "The bustling streets of Jerusalem during the time of the Judges.",
    "A fishing village in Galilee, witnessing miracles and teachings.",
    "The exile in Babylon, maintaining faith amidst a foreign culture.",
    "Paul's missionary journeys, spreading the word in new lands.",
    "The construction of Solomon's Temple, a time of wisdom and grandeur.",
    "The days of Elijah the Prophet, standing against idolatry.",
    "Nehemiah rebuilding the walls of Jerusalem, facing opposition and hard work.",
    "The early church in Acts, sharing all things in common and facing persecution."
];

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const { message, gameState, adCompleted, history = [], mode = 'game' } = await req.json()
        const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')

        if (!mistralApiKey) {
            throw new Error('MISTRAL_API_KEY is not set')
        }

        // Get IP address from request headers
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

        // Handle ad completion - grant +20 turns
        if (adCompleted === true) {
            const currentTurns = ipTurnCounts.get(ip) || 0;
            // Reset counter back 20 turns (granting 20 more)
            const newCount = Math.max(0, currentTurns - 20);
            ipTurnCounts.set(ip, newCount);

            return new Response(JSON.stringify({
                success: true,
                message: 'Ad completed! Granted 20 more turns',
                turnsRemaining: MAX_TURNS - newCount
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // CHAT MODE HANDLING
        if (mode === 'chat') {
            const chatSystemPrompt = `You are Selah, a wise and gentle biblical guide. 
            You are helpful, knowledgeable about Scripture, and encouraging.
            Keep your responses concise (under 50 words) and conversational.
            Do not act as a Game Master or RPG narrator. just be a helpful chat companion.`;

            const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${mistralApiKey}`
                },
                body: JSON.stringify({
                    model: 'mistral-small-latest',
                    messages: [
                        { role: 'system', content: chatSystemPrompt },
                        ...history,
                        { role: 'user', content: message }
                    ]
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(`Mistral API error: ${data.message || 'Unknown error'}`)

            return new Response(JSON.stringify({
                text: data.choices[0].message.content
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // GAME MODE LOGIC (Original)
        // Check if this is a turn (not the initial START_ADVENTURE)
        if (message !== 'START_ADVENTURE') {
            const currentTurns = ipTurnCounts.get(ip) || 0;

            // Check if limit reached
            if (currentTurns >= MAX_TURNS) {
                return new Response(JSON.stringify({
                    narrative: "Your adventure has reached a crossroads. Watch a brief message to continue your journey, or create an account for unlimited adventures.",
                    choices: [],
                    scenePrompt: "ancient crossroads at sunset, traveler at decision point, paths diverging",
                    limitReached: true,
                    canWatchAd: true
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                })
            }

            // Increment turn count
            ipTurnCounts.set(ip, currentTurns + 1);
        }

        const systemPrompt = `You are the Game Master of a biblical adventure RPG in the style of Dungeons & Dragons. 
    You craft immersive narrative scenarios set in biblical times, presenting challenging situations that require wisdom, courage, and faith.
    
    GAME MASTER ROLE:
    - Create engaging narratives with meaningful consequences
    - Present the player with difficult choices and moral dilemmas
    - Describe scenes vividly with rich sensory details
    - Reference biblical themes, locations, and wisdom
    - Maintain continuity based on previous choices
    
    SCENARIO STRUCTURE:
    1. Set the scene with vivid description (2-3 sentences)
    2. Present a situation/challenge/condition the player faces
    3. Offer 2-4 meaningful choices (brief, action-oriented)
    4. Each choice should have distinct consequences
    
    OUTPUT FORMAT:
    Return a JSON object with these exact fields:
    {
      "narrative": "The immersive scene description and current situation...",
      "choices": [
        "Choice 1: Brief action description",
        "Choice 2: Brief action description", 
        "Choice 3: Brief action description (optional)",
        "Choice 4: Brief action description (optional)"
      ],
      "scenePrompt": "Detailed visual description for image generation"
    }
    
    SCENE PROMPT GUIDELINES:
    - Biblical/ancient setting with dramatic lighting
    - Describe environment, atmosphere, and key visual elements
    - Examples: "desert marketplace at dusk, merchants and travelers, oil lamps glowing, ancient middle eastern architecture"
    - "mountain cave entrance, stormy sky, olive trees, dramatic sunbeams breaking through clouds"
    
    STARTING_THEMES:
    - The current adventure theme is: {{THEME}}
    
    STARTING SCENARIO:
    If this is the first message (message is "START_ADVENTURE"), begin with an intriguing opening scenario based on the {{THEME}} that hooks the player into the adventure.
    Do NOT use the generic "sun hangs low over Canaan" opening. Create something unique and specific to the theme.
    
    CONTINUING SCENARIOS:
    If the player has made a choice, acknowledge their decision and present the consequences with a new scenario and choices.`

        // Select a random theme for the start
        const theme = STARTING_THEMES[Math.floor(Math.random() * STARTING_THEMES.length)];
        const finalSystemPrompt = systemPrompt.replace('{{THEME}}', theme);

        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${mistralApiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: [
                    { role: 'system', content: finalSystemPrompt },
                    ...history,
                    { role: 'user', content: message }
                ],
                response_format: { type: 'json_object' }
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Mistral API error:', data)
            throw new Error(`Mistral API error: ${data.message || 'Unknown error'}`)
        }

        const aiResponse = JSON.parse(data.choices[0].message.content)

        return new Response(JSON.stringify(aiResponse), {
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
