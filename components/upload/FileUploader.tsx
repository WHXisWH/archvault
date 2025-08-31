import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, DocumentIcon, XCircleIcon } from '@heroicons/react/24/outline';

export function FileUploader({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    onFilesSelected(newFiles);
  }, [files, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileToRemove: File) => {
    const newFiles = files.filter(file => file !== fileToRemove);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Drag & drop files here, or click to select files</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-800">Selected Files:</h4>
          <ul role="list" className="mt-2 divide-y divide-gray-200 border rounded-md">
            {files.map((file) => (
              <li key={file.name} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="w-6 h-6 text-gray-500 mr-3" />
                  <span className="text-sm font-medium text-gray-700">{file.name}</span>
                </div>
                <button onClick={() => removeFile(file)} className="text-gray-400 hover:text-gray-600">
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
