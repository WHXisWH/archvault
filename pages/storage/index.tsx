import Layout from '@/components/layout/Layout';
import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { StorageFile } from '@/lib/types';

const files: StorageFile[] = [
  {
    cid: 'bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku',
    name: 'Tower_A_Floor_Plans.dwg',
    size: 150 * 1024 * 1024,
    type: 'image/vnd.dwg',
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    uploadedBy: 'user-123',
    version: 3,
    status: 'warm',
    metadata: { project: 'City Tower Complex' },
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
    metadata: { project: 'Riverside Mall Renovation' },
  },
  {
    cid: 'bafkreia7k3z4j6e7y2u5qkenvjru73oj5l63dcnw7j3p2j6j2d6j2d6j2d',
    name: 'Plumbing_Layout.ifc',
    size: 80 * 1024 * 1024,
    type: 'application/ifc',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    uploadedBy: 'user-123',
    version: 1,
    status: 'warm',
    metadata: { project: 'City Tower Complex' },
  },
];

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default function Storage() {
  return (
    <Layout showSidebar>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Storage Browser</h1>

        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            <li className="px-6 py-4 bg-gray-50 hidden md:flex">
              <div className="w-2/5 text-sm font-semibold text-gray-600">Name</div>
              <div className="w-1/5 text-sm font-semibold text-gray-600">Project</div>
              <div className="w-1/5 text-sm font-semibold text-gray-600">Size</div>
              <div className="w-1/5 text-sm font-semibold text-gray-600">Last Modified</div>
            </li>
            {files.map((file) => (
              <li key={file.cid} className="px-6 py-4 hover:bg-gray-50 flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 flex items-center mb-2 md:mb-0">
                  <DocumentTextIcon className="w-6 h-6 text-gray-400 mr-3" />
                  <Link href={`/storage/${file.cid}`} className="text-sm font-medium text-blue-600 hover:underline truncate">
                    {file.name}
                  </Link>
                </div>
                <div className="w-full md:w-1/5 text-sm text-gray-500 mb-2 md:mb-0">
                  <span className="font-semibold md:hidden">Project: </span>
                  {file.metadata.project}
                </div>
                <div className="w-full md:w-1/5 text-sm text-gray-500 mb-2 md:mb-0">
                  <span className="font-semibold md:hidden">Size: </span>
                  {formatBytes(file.size)}
                </div>
                <div className="w-full md:w-1/5 text-sm text-gray-500">
                  <span className="font-semibold md:hidden">Last Modified: </span>
                  {file.uploadedAt.toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
