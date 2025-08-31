import type { NextApiRequest, NextApiResponse } from 'next';
import type { PDPProof } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cid } = req.query;
    console.log(`Getting PDP status for ${cid}`);
    // Mock response
    const mockStatus: PDPProof = {
      proofSetId: `pdp-set-${cid}`,
      rootCids: [cid as string],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastVerified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      nextVerification: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      status: 'verified',
    };
    res.status(200).json(mockStatus);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
