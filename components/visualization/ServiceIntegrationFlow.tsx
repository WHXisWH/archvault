
import React, { useState, useEffect } from 'react';
import { ServiceNode } from './ServiceNode';
import { Arrow } from './Arrow';
import { PaymentFlowTracker } from './PaymentFlowTracker';

type DemoStep = 'upload' | 'pdp' | 'cdn' | 'payment' | 'idle';

export function ServiceIntegrationFlow() {
  const [activeDemo, setActiveDemo] = useState<DemoStep>('idle');

  useEffect(() => {
    const sequence: DemoStep[] = ['upload', 'pdp', 'cdn', 'payment', 'idle'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setActiveDemo(sequence[currentIndex]);
      currentIndex = (currentIndex + 1) % sequence.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-medium mb-4">Filecoin Services Integration</h3>

      <div className="flex justify-between items-center mb-8">
        <ServiceNode
          name="Client App"
          status="active"
          data={{ files: 3, size: "2.3GB" }}
        />
        <Arrow animated={activeDemo === 'upload'} />

        <ServiceNode
          name="Warm Storage"
          status={activeDemo === 'upload' || activeDemo === 'pdp' ? 'active' : 'idle'}
          data={{ cids: 3, replicas: 3 }}
        />
        <Arrow animated={activeDemo === 'pdp'} />

        <ServiceNode
          name="PDP Verification"
          status={activeDemo === 'pdp' ? 'active' : 'idle'}
          data={{ proofSets: 1, lastVerified: '1m ago' }}
        />
        <Arrow animated={activeDemo === 'cdn'} />

        <ServiceNode
          name="FilCDN"
          status={activeDemo === 'cdn' ? 'active' : 'idle'}
          data={{ cacheHitRate: "94%", avgTTFB: "420ms" }}
        />
      </div>

      <div className="border-t pt-4">
        <PaymentFlowTracker />
      </div>
    </div>
  );
}
