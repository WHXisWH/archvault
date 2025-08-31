import type { NextApiRequest, NextApiResponse } from 'next';
import type { StorageFile } from '@/lib/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StorageFile[] | { message: string }>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const mockFiles: StorageFile[] = [
      {
        cid: 'bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku',
        name: 'Tower_A_Floor_Plans.dwg',
        size: 150 * 1024 * 1024,
        type: 'image/vnd.dwg',
        uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        uploadedBy: 'user-123',
        version: 3,
        status: 'warm',
        metadata: { revision: 'A3' },
      },
      {
        cid: 'bafkreicg5z43j6e7y2u5qkenvjru73oj5l63dcnw7j3p2j6j2d6j2d6j2d',
        name: 'Electrical_Systems_v2.pdf',
        size: 25 * 1024 * 1024,
        type: 'application/pdf',
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        uploadedBy: 'user-456',
        version: 2,
        status: 'warm',
        metadata: { discipline: 'Electrical' },
      },
      {
        cid: 'bafkreia7k3z4j6e7y2u5qkenvjru73oj5l63dcnw7j3p2j6j2d6j2d6j2d',
        name: 'Plumbing_Layout.ifc',
        size: 80 * 1024 * 1024,
        type: 'application/ifc',
        uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        uploadedBy: 'user-123',
        version: 1,
        status: 'warm',
        metadata: { discipline: 'Plumbing' },
      },
    ];

    res.status(200).json(mockFiles);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
