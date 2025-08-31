import Layout from '@/components/layout/Layout';
import { ArrowUpRightIcon, FolderIcon, CircleStackIcon, ClockIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Active Projects', stat: '3', icon: FolderIcon },
  { name: 'Total Storage Used', stat: '7.0 GB', icon: CircleStackIcon },
  { name: 'Recent Files', stat: '12', icon: ClockIcon },
];

const recentActivity = [
  { id: 1, project: 'City Tower Complex', user: 'John Doe', action: 'uploaded a new version of', file: 'Tower_A_Lobby.dwg', time: '2h ago' },
  { id: 2, project: 'Riverside Mall Renovation', user: 'Jane Smith', action: 'verified a milestone for', file: 'Phase 2 Blueprints', time: '1d ago' },
  { id: 3, project: 'Tech Campus Phase 1', user: 'System', action: 'archived project', file: '', time: '3d ago' },
];

export default function Dashboard() {
  return (
    <Layout showSidebar>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div key={item.name} className="relative bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div className="absolute bg-blue-500 rounded-md p-3">
                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                  <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        View all<span className="sr-only"> {item.name} stats</span>
                      </a>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-800">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.file}</span> in project <span className="font-medium text-blue-600">{activity.project}</span>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
