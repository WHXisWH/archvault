import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export function PDPStatus({ status = 'verified' }: { status?: 'verified' | 'pending' | 'failed' }) {
  const statusInfo = {
    verified: {
      icon: CheckCircleIcon,
      color: 'text-green-500',
      text: 'Verified',
      description: 'Last verified on Aug 30, 2025',
    },
    pending: {
      icon: ClockIcon,
      color: 'text-yellow-500',
      text: 'Pending',
      description: 'Next verification scheduled for Sep 1, 2025',
    },
    failed: {
      icon: ExclamationCircleIcon,
      color: 'text-red-500',
      text: 'Failed',
      description: 'Last verification attempt failed on Aug 29, 2025',
    },
  };

  const currentStatus = statusInfo[status];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">PDP Status</h3>
      <div className="flex items-center">
        <currentStatus.icon className={`w-8 h-8 ${currentStatus.color} mr-4`} />
        <div>
          <p className={`text-xl font-semibold ${currentStatus.color}`}>{currentStatus.text}</p>
          <p className="text-sm text-gray-500">{currentStatus.description}</p>
        </div>
      </div>
    </div>
  );
}
