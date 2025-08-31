import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { FolderIcon, ClockIcon, DocumentTextIcon, CloudArrowUpIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import type { Project, StorageFile } from '@/lib/types';

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('files');

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          // const projectRes = await fetch(`/api/projects/${id}`);
          // const projectData = await projectRes.json();
          // setProject(projectData);

          // const filesRes = await fetch(`/api/projects/${id}/files`);
          // const filesData = await filesRes.json();
          // setFiles(filesData);

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
          setProject(mockProject);

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
          ];
          setFiles(mockFiles);

        } catch (error) {
          console.error('Failed to fetch project details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id]);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  if (loading) {
    return <Layout showSidebar><div className="text-center py-10">Loading project...</div></Layout>;
  }

  if (!project) {
    return <Layout showSidebar><div className="text-center py-10">Project not found.</div></Layout>;
  }

  return (
    <Layout showSidebar>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl">{project.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {project.status}
              </span>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <CogIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-600">
            <div className="flex items-center"><FolderIcon className="w-5 h-5 mr-2 text-gray-400" /> {project.fileCount} files</div>
            <div className="flex items-center"><CloudArrowUpIcon className="w-5 h-5 mr-2 text-gray-400" /> {formatBytes(project.totalSize)}</div>
            <div className="flex items-center"><ClockIcon className="w-5 h-5 mr-2 text-gray-400" /> Last updated: {project.lastModified.toLocaleDateString()}</div>
          </div>
        </div>

        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select id="tabs" name="tabs" className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" defaultValue={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
              <option value="files">Files</option>
              <option value="versions">Versions</option>
              <option value="pdp">PDP Status</option>
              <option value="settings">Settings</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button onClick={() => setActiveTab('files')} className={`${activeTab === 'files' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Files</button>
                <button onClick={() => setActiveTab('versions')} className={`${activeTab === 'versions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Versions</button>
                <button onClick={() => setActiveTab('pdp')} className={`${activeTab === 'pdp' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>PDP Status</button>
                <button onClick={() => setActiveTab('settings')} className={`${activeTab === 'settings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Settings</button>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {activeTab === 'files' && (
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium text-gray-800">Project Files</h2>
              </div>
              <ul role="list" className="divide-y divide-gray-200">
                {files.map((file) => (
                  <li key={file.cid} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <DocumentTextIcon className="w-8 h-8 text-gray-400 mr-4" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatBytes(file.size)} - Uploaded on {file.uploadedAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Version {file.version}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'versions' && <div>Versions content goes here</div>}
          {activeTab === 'pdp' && <div>PDP Status content goes here</div>}
          {activeTab === 'settings' && <div>Settings content goes here</div>}
        </div>
      </div>
    </Layout>
  );
}
