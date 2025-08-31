export function LoadingSpinner({ size = 'h-8 w-8' }: { size?: string }) {
  return (
    <div className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600 ${size}`} />
  );
}
