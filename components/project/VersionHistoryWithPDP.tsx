
import { DocumentDuplicateIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface VersionHistoryWithPDPProps {
  versions: any[];
  pdpProofs: any[];
}

const mockVersions = [
  { id: 3, name: 'Tower_A_Floor_Plans_v3.dwg', date: '2023-10-28', user: 'John Doe', pdpStatus: 'Verified' },
  { id: 2, name: 'Tower_A_Floor_Plans_v2.dwg', date: '2023-10-25', user: 'Jane Smith', pdpStatus: 'Verified' },
  { id: 1, name: 'Tower_A_Floor_Plans_v1.dwg', date: '2023-10-22', user: 'John Doe', pdpStatus: 'Verified' },
];

export function VersionHistoryWithPDP({ versions, pdpProofs }: VersionHistoryWithPDPProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Version History & PDP</h3>
      <ul role="list" className="divide-y divide-gray-200">
        {mockVersions.map((version) => (
          <li key={version.id} className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DocumentDuplicateIcon className="w-6 h-6 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{version.name}</p>
                  <p className="text-xs text-gray-500">by {version.user} on {version.date}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <ShieldCheckIcon className={`w-5 h-5 mr-2 ${version.pdpStatus === 'Verified' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`${version.pdpStatus === 'Verified' ? 'text-green-600' : 'text-red-600'}`}>
                  {version.pdpStatus}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
