import { useState, useEffect } from 'react';
import type { UploadProgress } from '@/lib/types';

export function UploadProgress({ file }: { file: File }) {
  const [progress, setProgress] = useState<UploadProgress>({
    fileId: file.name,
    fileName: file.name,
    progress: 0,
    speed: 0,
    remainingTime: 0,
    status: 'preparing',
  });

  useEffect(() => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, status: 'complete' };
        }
        const newProgress = prev.progress + 10;
        const speed = Math.random() * 5 + 5; // 5-10 MB/s
        const remainingBytes = file.size * (1 - newProgress / 100);
        const remainingTime = remainingBytes / (speed * 1024 * 1024);

        return {
          ...prev,
          progress: newProgress,
          speed,
          remainingTime,
          status: 'uploading',
        };
      });
    }, 500);

    return () => clearInterval(interval);
  }, [file.size]);

  const formatSpeed = (speed: number) => {
    return `${speed.toFixed(2)} MB/s`;
  };

  const formatTime = (seconds: number) => {
    if (seconds === Infinity || seconds > 3600) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}m ${secs}s remaining`;
  };

  return (
    <div className="my-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-gray-800 truncate">{progress.fileName}</p>
        <p className="text-sm text-gray-600">{progress.status}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.progress}%` }}></div>
      </div>
      <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
        <span>{`${progress.progress}%`}</span>
        <span>{formatSpeed(progress.speed)}</span>
        <span>{formatTime(progress.remainingTime)}</span>
      </div>
    </div>
  );
}
