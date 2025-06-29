import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;
  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe secret key not set' });
  }

  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }
    const session = await response.json();
    const competition_id = session.metadata?.competition_id;
    return res.status(200).json({ competition_id });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch session' });
  }
} 