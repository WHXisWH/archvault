import { DocumentIcon } from '@heroicons/react/24/outline';
import type { StorageFile } from '@/lib/types';

export function FilePreview({ file }: { file: StorageFile | null }) {
  if (!file) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Select a file to preview</p>
      </div>
    );
  }

  const isImage = file.type.startsWith('image/');

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Preview: {file.name}</h3>
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
        {isImage ? (
          <img src={`/api/storage/raw/${file.cid}`} alt={file.name} className="max-h-full max-w-full" />
        ) : (
          <div className="text-center">
            <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto" />
            <p className="mt-4 text-gray-500">Preview not available for this file type.</p>
            <p className="text-sm text-gray-400">{file.type}</p>
          </div>
        )}
      </div>
    </div>
  );
}
