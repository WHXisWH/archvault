import { CircleStackIcon, DocumentDuplicateIcon, FolderIcon } from '@heroicons/react/24/outline';

const overviewStats = [
  { name: 'Total Storage Used', value: '7.0 GB', icon: CircleStackIcon },
  { name: 'Total Files', value: '245', icon: DocumentDuplicateIcon },
  { name: 'Projects', value: '3', icon: FolderIcon },
];

const projectBreakdown = [
  { name: 'City Tower Complex', size: '2.3 GB', files: 156 },
  { name: 'Riverside Mall Renovation', size: '1.2 GB', files: 89 },
  { name: 'Tech Campus Phase 1', size: '3.5 GB', files: 0 }, // Archived project size
];

export function StorageOverview() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {overviewStats.map((stat) => (
          <div key={stat.name} className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <stat.icon className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Storage by Project</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {projectBreakdown.map((project) => (
            <li key={project.name} className="py-3 flex justify-between">
              <p className="text-sm font-medium text-gray-800">{project.name}</p>
              <div className="flex space-x-6">
                <p className="text-sm text-gray-600">{project.size}</p>
                <p className="text-sm text-gray-600">{project.files} files</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
