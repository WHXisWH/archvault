
import { SunIcon, ArchiveBoxIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface StorageServicePanelProps {
  warmStorage: any;
  archiveDeals: any[];
  showTransition: boolean;
}

export function StorageServicePanel({ warmStorage, archiveDeals, showTransition }: StorageServicePanelProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Storage Services</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <SunIcon className="w-6 h-6 text-yellow-500 mr-3" />
            <h4 className="font-semibold text-gray-700">Warm Storage</h4>
          </div>
          <div className="text-sm text-gray-600 pl-9">
            <p>Status: <span className="font-medium text-green-600">Active</span></p>
            <p>Utilization: <span className="font-medium">65%</span></p>
          </div>
        </div>

        {showTransition && (
          <div className="flex justify-center items-center text-gray-400">
            <ArrowRightIcon className="w-5 h-5" />
            <span className="text-xs ml-2">Auto-archive</span>
          </div>
        )}

        <div>
          <div className="flex items-center mb-2">
            <ArchiveBoxIcon className="w-6 h-6 text-blue-500 mr-3" />
            <h4 className="font-semibold text-gray-700">Archive Storage (Cold)</h4>
          </div>
          <div className="text-sm text-gray-600 pl-9">
            <p>Active Deals: <span className="font-medium">{archiveDeals.length || 2}</span></p>
            <p>Total Archived: <span className="font-medium">1.8 TB</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
