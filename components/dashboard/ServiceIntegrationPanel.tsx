
const serviceIntegrationMetrics = [
  {
    service: 'Warm Storage',
    status: 'active',
    utilization: '85%',
    sla: '99.95%',
    cost: '$23.40/month'
  },
  {
    service: 'PDP Verification',
    status: 'active',
    lastProof: '2h ago',
    successRate: '100%',
    cost: '$5.20/month'
  },
  {
    service: 'FilCDN',
    status: 'active',
    avgTTFB: '420ms',
    hitRate: '94%',
    cost: '$12.80/month'
  },
  {
    service: 'Payment Rails',
    status: 'active',
    streamingActive: '3 rails',
    settled: '$156.40',
    cost: '$1.20/month'
  }
];

export function ServiceIntegrationPanel() {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Filecoin Services Status</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Real-time status of integrated Filecoin services.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {serviceIntegrationMetrics.map((metric, idx) => (
            <div key={metric.service} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
              <dt className="text-sm font-medium text-gray-500">{metric.service}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-2 gap-x-4">
                  <div>Status: <span className="font-semibold text-green-600">{metric.status}</span></div>
                  {metric.utilization && <div>Utilization: <span className="font-semibold">{metric.utilization}</span></div>}
                  {metric.lastProof && <div>Last Proof: <span className="font-semibold">{metric.lastProof}</span></div>}
                  {metric.avgTTFB && <div>Avg TTFB: <span className="font-semibold">{metric.avgTTFB}</span></div>}
                  {metric.streamingActive && <div>Active Streams: <span className="font-semibold">{metric.streamingActive}</span></div>}
                  {metric.sla && <div>SLA: <span className="font-semibold">{metric.sla}</span></div>}
                  {metric.successRate && <div>Success Rate: <span className="font-semibold">{metric.successRate}</span></div>}
                  {metric.hitRate && <div>Hit Rate: <span className="font-semibold">{metric.hitRate}</span></div>}
                  {metric.settled && <div>Settled: <span className="font-semibold">{metric.settled}</span></div>}
                  <div>Cost: <span className="font-semibold">{metric.cost}</span></div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
