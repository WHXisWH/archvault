import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { StorageFile } from '@/lib/types';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function FileList({ files }: { files: StorageFile[] }) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        <li className="px-6 py-4 bg-gray-50 hidden md:flex">
          <div className="w-2/5 text-sm font-semibold text-gray-600">Name</div>
          <div className="w-1/5 text-sm font-semibold text-gray-600">Size</div>
          <div className="w-1/5 text-sm font-semibold text-gray-600">Last Modified</div>
          <div className="w-1/5 text-sm font-semibold text-gray-600">Version</div>
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
              <span className="font-semibold md:hidden">Size: </span>
              {formatBytes(file.size)}
            </div>
            <div className="w-full md:w-1/5 text-sm text-gray-500 mb-2 md:mb-0">
              <span className="font-semibold md:hidden">Last Modified: </span>
              {file.uploadedAt.toLocaleDateString()}
            </div>
            <div className="w-full md:w-1/5 text-sm text-gray-500">
              <span className="font-semibold md:hidden">Version: </span>
              {file.version}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
