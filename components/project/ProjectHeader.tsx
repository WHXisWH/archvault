
import type { Project } from '@/lib/types';
import { FolderIcon, ClockIcon, CloudArrowUpIcon, CogIcon } from '@heroicons/react/24/outline';

interface ProjectHeaderProps {
  project: Project;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
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
  );
}
