import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { projectId, fileCid } = req.body;
    console.log(`Adding file ${fileCid} to warm storage for project ${projectId}`);
    // Mock response
    res.status(200).json({ success: true, message: `File ${fileCid} added to warm storage` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
