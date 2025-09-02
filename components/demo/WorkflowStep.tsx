
import React from 'react';

type Status = 'pending' | 'in-progress' | 'completed' | 'error';

interface WorkflowStepProps {
  step: number;
  title: string;
  description: string;
  status: Status;
  children: React.ReactNode;
}

const statusStyles = {
  pending: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-500',
  },
  'in-progress': {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-700',
  },
  completed: {
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-700',
  },
};

export function WorkflowStep({ step, title, description, status, children }: WorkflowStepProps) {
  const styles = statusStyles[status];

  return (
    <div className={`p-6 rounded-lg border-2 ${styles.border} ${styles.bg}`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 ${styles.border} ${styles.text} flex items-center justify-center font-bold text-xl`}>
          {step}
        </div>
        <div className="ml-4">
          <h3 className={`text-lg font-semibold ${styles.text}`}>{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="mt-4 pl-16">
        {children}
      </div>
    </div>
  );
}
