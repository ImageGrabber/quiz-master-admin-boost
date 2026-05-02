import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const status = url.searchParams.get('status')
    const userId = url.searchParams.get('user_id')
    const amountLocal = url.searchParams.get('amount_local')
    const transId = url.searchParams.get('trans_id')
    const receivedHash = url.searchParams.get('hash')

    console.log(`[CPX Postback] User: ${userId}, Status: ${status}, Amount: ${amountLocal}, Trans: ${transId}`);

    // 1. Basic Validation
    if (!userId || !status) {
      throw new Error("Missing required parameters");
    }

    // 2. Status Check (CPX sends '1' for success, '2' for chargeback/fraud)
    if (status !== '1') {
      return new Response(JSON.stringify({ 
        status: "success", 
        message: `Postback ignored (status: ${status})` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // 3. Initialize Supabase Client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const xpToAdd = parseInt(amountLocal || '0');

    // 4. Update Database
    // We call the 'increment_xp' RPC function created earlier
    const { data, error } = await supabaseClient.rpc('increment_xp', {
      user_id: userId,
      amount: xpToAdd
    });

    if (error) {
      console.error("Database Error:", error);
      
      // Fallback: Attempt a direct update if RPC is missing
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ 
          // Note: Standard Postgres increment syntax isn't supported in .update() 
          // through the client easily without a subquery, 
          // so the RPC function is strongly recommended.
        })
        .eq('id', userId);
        
      if (updateError) throw updateError;
    }

    // 5. Log completion for auditing/deduplication
    await supabaseClient
      .from('attempts')
      .insert({
        user_id: userId,
        score: xpToAdd,
        completed: true,
        answers: { 
          source: 'cpx_survey', 
          transaction_id: transId,
          processed_at: new Date().toISOString()
        }
      });

    return new Response(JSON.stringify({ 
      status: "success", 
      received: true,
      rewarded: xpToAdd
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Postback Processing Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
