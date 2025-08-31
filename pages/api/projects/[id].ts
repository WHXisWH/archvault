import type { NextApiRequest, NextApiResponse } from 'next';
import type { Project } from '@/lib/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | { message: string }>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const mockProject: Project = {
      id: id as string,
      name: 'City Tower Complex',
      description: 'Mixed-use development with 3 towers, focusing on sustainable design and smart building technology.',
      status: 'active',
      fileCount: 156,
      totalSize: 2.3 * 1024 * 1024 * 1024,
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      owner: 'user-123',
      team: ['user-123', 'user-456'],
      sla: { availability: 99.9, maxLatency: 800, minBandwidth: 100 },
    };

    res.status(200).json(mockProject);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
