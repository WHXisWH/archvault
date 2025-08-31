import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { PlusIcon, FolderIcon, ClockIcon, CheckCircleIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // This would fetch from an API endpoint
        // const response = await fetch('/api/projects');
        // const data = await response.json();
        // setProjects(data);

        // Using mock data for now
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
        setProjects(mockProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <Layout showSidebar>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
            <Link
              href="/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <p>Loading projects...</p>
            </div>
          ) : (
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.id} className="col-span-1 bg-white rounded-lg shadow-md divide-y divide-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-lg font-semibold truncate hover:text-blue-600">
                          <Link href={`/projects/${project.id}`}>{project.name}</Link>
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate h-10">{project.description}</p>
                    </div>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="w-0 flex-1 flex">
                        <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg">
                          <FolderIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-3">{project.fileCount} Files</span>
                        </div>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <div className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg">
                          <ClockIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-3">{formatBytes(project.totalSize)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
