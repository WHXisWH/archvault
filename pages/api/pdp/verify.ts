import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cid } = req.body;
    console.log(`Triggering PDP verification for ${cid}`);
    // Mock response
    res.status(200).json({ success: true, message: `PDP verification triggered for ${cid}` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
