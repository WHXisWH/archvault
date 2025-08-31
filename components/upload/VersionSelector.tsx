import { useState } from 'react';
import { TagIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { Version } from '@/lib/types';

const mockVersions: Version[] = [
  {
    id: 'v-1',
    projectId: 'proj-1',
    versionNumber: 1,
    cid: 'bafk...1',
    name: 'Initial Design Submission',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    createdBy: 'user-1',
    isFrozen: true,
    files: [],
    signatures: [],
  },
  {
    id: 'v-2',
    projectId: 'proj-1',
    versionNumber: 2,
    cid: 'bafk...2',
    name: 'Client Feedback Revisions',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdBy: 'user-2',
    isFrozen: false,
    files: [],
    signatures: [],
  },
];

export function VersionSelector({ onVersionSelected }: { onVersionSelected: (versionId: string | null) => void }) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(mockVersions[1].id);

  const handleSelection = (versionId: string | null) => {
    setSelectedVersion(versionId);
    onVersionSelected(versionId);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Version</h3>
      <div className="space-y-3">
        {mockVersions.map((version) => (
          <div
            key={version.id}
            onClick={() => handleSelection(version.id)}
            className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between ${selectedVersion === version.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <TagIcon className="w-6 h-6 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">{version.name}</p>
                <p className="text-sm text-gray-500">v{version.versionNumber} - created on {version.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            {selectedVersion === version.id && <div className="w-2 h-2 bg-blue-500 rounded-full" />} 
          </div>
        ))}
        <div
          onClick={() => handleSelection(null)}
          className={`border rounded-lg p-4 cursor-pointer flex items-center ${selectedVersion === null ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
          <PlusIcon className="w-6 h-6 text-gray-500 mr-3" />
          <p className="font-medium text-gray-800">Create New Version</p>
        </div>
      </div>
    </div>
  );
}
