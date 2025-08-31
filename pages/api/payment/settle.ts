import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { railId } = req.body;
    console.log(`Settling payment for rail ${railId}`);
    // Mock response
    res.status(200).json({ success: true, message: `Payment rail ${railId} settled` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
