import type { NextApiRequest, NextApiResponse } from 'next';
import type { Project } from '@/lib/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | { message: string }>
) {
  if (req.method === 'POST') {
    const { name, description, sla } = req.body;

    if (!name || !description || !sla) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProject: Project = {
      id: `prj_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      name,
      description,
      sla,
      status: 'active',
      fileCount: 0,
      totalSize: 0,
      createdAt: new Date(),
      lastModified: new Date(),
      owner: 'current-user', // This would be dynamically set based on auth
      team: ['current-user'],
    };

    console.log('New project created:', newProject);

    res.status(201).json(newProject);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
