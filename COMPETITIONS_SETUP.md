# Paid Competitions Feature Setup Guide

This guide will help you set up the paid competitions feature for your quiz platform.

## Overview

The paid competitions feature allows users to:
- Join competitions with entry fees
- Compete for prize pools
- View real-time leaderboards
- Receive prizes based on performance

## Database Setup

### 1. Run the Migration

First, run the database migration to create the required tables:

```bash
# Navigate to your Supabase project
cd supabase

# Run the migration
supabase db push
```

This will create the following tables:
- `competitions` - Stores competition details
- `competition_entries` - Tracks user entries and payments
- `competition_results` - Stores competition results and rankings

### 2. Verify Tables

Check that the tables were created successfully:

```sql
-- Check competitions table
SELECT * FROM competitions LIMIT 1;

-- Check competition_entries table
SELECT * FROM competition_entries LIMIT 1;

-- Check competition_results table
SELECT * FROM competition_results LIMIT 1;
```

## Stripe Integration

### 1. Install Stripe Dependencies

```bash
npm install stripe
```

### 2. Set Up Environment Variables

Add the following to your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Create API Endpoint

Create a backend API endpoint for handling Stripe checkout sessions. Here are examples for different frameworks:

#### Next.js API Route

Create `pages/api/create-competition-checkout.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../integrations/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { competition_id, user_id, entry_fee, title } = await request.json();

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user || user.id !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user already has an entry for this competition
    const { data: existingEntry } = await supabase
      .from('competition_entries')
      .select('id, payment_status')
      .eq('competition_id', competition_id)
      .eq('user_id', user_id)
      .single();

    if (existingEntry) {
      if (existingEntry.payment_status === 'completed') {
        return NextResponse.json({ error: 'Already joined this competition' }, { status: 400 });
      }
      if (existingEntry.payment_status === 'pending') {
        return NextResponse.json({ error: 'Payment already in progress' }, { status: 400 });
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Competition Entry: ${title}`,
              description: `Entry fee for ${title} competition`,
            },
            unit_amount: Math.round(entry_fee * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/competitions?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/competitions?canceled=true`,
      metadata: {
        competition_id,
        user_id,
        type: 'competition_entry'
      },
    });

    // Create or update competition entry
    if (existingEntry) {
      await supabase
        .from('competition_entries')
        .update({
          stripe_payment_intent_id: session.payment_intent as string,
          payment_status: 'pending'
        })
        .eq('id', existingEntry.id);
    } else {
      await supabase
        .from('competition_entries')
        .insert({
          competition_id,
          user_id,
          stripe_payment_intent_id: session.payment_intent as string,
          payment_status: 'pending'
        });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

#### Express.js Endpoint

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-competition-checkout', async (req, res) => {
  try {
    const { competition_id, user_id, entry_fee, title } = req.body;

    // Verify user authentication here
    // Check existing entries
    // Create Stripe session
    // Update database

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Competition Entry: ${title}`,
            description: `Entry fee for ${title} competition`,
          },
          unit_amount: Math.round(entry_fee * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/competitions?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/competitions?canceled=true`,
      metadata: {
        competition_id,
        user_id,
        type: 'competition_entry'
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
```

### 4. Set Up Webhook Handler

Create a webhook handler to process successful payments:

```typescript
// pages/api/stripe-webhook.ts (Next.js)
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '../../../integrations/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    if (session.metadata?.type === 'competition_entry') {
      // Update competition entry status
      await supabase
        .from('competition_entries')
        .update({ payment_status: 'completed' })
        .eq('stripe_payment_intent_id', session.payment_intent);
    }
  }

  return NextResponse.json({ received: true });
}
```

## Frontend Integration

### 1. Update API Calls

Replace the mock API call in `src/api/competition-checkout.ts` with actual API calls:

```typescript
export async function createCompetitionCheckout(
  request: CompetitionCheckoutRequest
): Promise<CompetitionCheckoutResponse> {
  const response = await fetch('/api/create-competition-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
}
```

### 2. Regenerate Supabase Types

After running the migration, regenerate your Supabase types:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
```

## Admin Features

### 1. Access Admin Competitions Page

Navigate to `/admin/competitions` to:
- Create new competitions
- Set entry fees and prize pools
- Manage competition status
- View participant counts

### 2. Competition Management

Admins can:
- Create competitions with specific quizzes
- Set entry fees and prize pools
- Schedule start and end dates
- Monitor participant entries
- View competition results

## User Features

### 1. Browse Competitions

Users can:
- View available competitions at `/competitions`
- See entry fees and prize pools
- Check competition status and dates
- View participant counts

### 2. Join Competitions

Users can:
- Pay entry fees via Stripe
- Access competition quizzes
- View real-time leaderboards
- Receive prizes based on performance

## Testing

### 1. Test Competition Creation

1. Create a competition as admin
2. Set a low entry fee (e.g., $1)
3. Use Stripe test cards for payments

### 2. Test Payment Flow

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### 3. Test Competition Flow

1. Join a competition
2. Complete the quiz
3. Check leaderboard rankings
4. Verify prize calculations

## Security Considerations

1. **Authentication**: Ensure users are authenticated before joining competitions
2. **Payment Verification**: Verify payments via webhooks, not client-side
3. **Access Control**: Only allow paid users to access competition quizzes
4. **Data Validation**: Validate all competition data on the server side

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Regenerate Supabase types after migration
2. **Payment Failures**: Check Stripe webhook configuration
3. **Access Denied**: Verify RLS policies are correctly set
4. **Missing Data**: Ensure all required fields are populated

### Debug Commands

```bash
# Check database tables
supabase db diff

# View logs
supabase logs

# Reset database (development only)
supabase db reset
```

## Next Steps

1. Set up Stripe webhooks for production
2. Implement prize payout automation
3. Add email notifications for competition updates
4. Create competition analytics dashboard
5. Add competition templates for quick setup

For additional support, refer to the main README.md file or contact the development team. 