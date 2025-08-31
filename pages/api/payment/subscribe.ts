import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { planId, token } = req.body;
    console.log(`Subscribing to plan ${planId} with token ${token}`);
    // Mock response
    res.status(200).json({ success: true, message: `Successfully subscribed to plan ${planId}` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
