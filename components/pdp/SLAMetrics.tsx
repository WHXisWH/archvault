import { ChartBarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const metrics = {
  availability: { name: 'Availability', value: '99.95%', target: '99.9%' },
  latency: { name: 'Average Latency', value: '750ms', target: '800ms' },
  pdpSuccess: { name: 'PDP Success Rate', value: '100%', target: '99.9%' },
};

export function SLAMetrics() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">SLA Metrics (Last 30 Days)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(metrics).map((metric) => (
          <div key={metric.name} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-600">{metric.name}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-gray-500">Target: {metric.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
