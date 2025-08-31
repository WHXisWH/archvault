import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { DocumentTextIcon, ClockIcon, UserCircleIcon, InformationCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import type { StorageFile } from '@/lib/types';

export default function FileDetails() {
  const router = useRouter();
  const { cid } = router.query;
  const [file, setFile] = useState<StorageFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cid) {
      // In a real app, you'd fetch this data from an API
      const mockFile: StorageFile = {
        cid: cid as string,
        name: 'Tower_A_Floor_Plans.dwg',
        size: 150 * 1024 * 1024,
        type: 'image/vnd.dwg',
        uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        uploadedBy: 'user-123',
        version: 3,
        status: 'warm',
        metadata: {
          project: 'City Tower Complex',
          discipline: 'Architectural',
          revision: 'A3',
        },
      };
      setFile(mockFile);
      setLoading(false);
    }
  }, [cid]);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  if (loading) {
    return <Layout showSidebar><div className="text-center py-10">Loading file details...</div></Layout>;
  }

  if (!file) {
    return <Layout showSidebar><div className="text-center py-10">File not found.</div></Layout>;
  }

  return (
    <Layout showSidebar>
      <div className="p-8">
        <div className="flex items-center mb-6">
          <DocumentTextIcon className="w-10 h-10 text-gray-500 mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{file.name}</h1>
            <p className="text-sm text-gray-500">CID: {file.cid}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">File Preview</h2>
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
                <p className="text-gray-500">Preview not available for this file type.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <InformationCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm">{formatBytes(file.size)}</span>
                </div>
                <div className="flex items-center">
                  <UserCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm">Uploaded by {file.uploadedBy}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-sm">Uploaded on {file.uploadedAt.toLocaleDateString()}</span>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-800 mb-2">Metadata</h3>
                  <dl className="text-sm">
                    {Object.entries(file.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <dt className="text-gray-500 capitalize">{key}</dt>
                        <dd className="text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Download File
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
