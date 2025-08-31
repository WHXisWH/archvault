import type { NextApiRequest, NextApiResponse } from 'next';
import type { Project } from '@/lib/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | { message: string }>
) {
  if (req.method === 'GET') {
    const mockProjects: Project[] = [
      {
        id: 'prj_city_tower_complex',
        name: 'City Tower Complex',
        description: 'Mixed-use development with 3 towers, focusing on sustainable design and smart building technology.',
        status: 'active',
        fileCount: 156,
        totalSize: 2.3 * 1024 * 1024 * 1024, // 2.3 GB
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        owner: 'user-123',
        team: ['user-123', 'user-456'],
        sla: { availability: 99.9, maxLatency: 800, minBandwidth: 100 },
      },
      {
        id: 'prj_riverside_mall_reno',
        name: 'Riverside Mall Renovation',
        description: 'Complete overhaul of a 20-year-old shopping center to modernize facilities and improve visitor experience.',
        status: 'active',
        fileCount: 89,
        totalSize: 1.2 * 1024 * 1024 * 1024, // 1.2 GB
        lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        owner: 'user-789',
        team: ['user-789', 'user-123'],
        sla: { availability: 99.9, maxLatency: 800, minBandwidth: 100 },
      },
      {
        id: 'prj_tech_campus_phase1',
        name: 'Tech Campus Phase 1',
        description: 'Initial development phase for a new corporate tech campus, including two office buildings and a data center.',
        status: 'archived',
        fileCount: 234,
        totalSize: 4.5 * 1024 * 1024 * 1024, // 4.5 GB
        lastModified: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        owner: 'user-123',
        team: ['user-123'],
        sla: { availability: 99.99, maxLatency: 500, minBandwidth: 200 },
      },
    ];
    res.status(200).json(mockProjects);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
