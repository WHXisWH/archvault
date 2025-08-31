import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileCid, retentionDays } = req.body;
    console.log(`Archiving file ${fileCid} for ${retentionDays} days`);
    // Mock response
    res.status(200).json({ success: true, message: `File ${fileCid} archived` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
