
import React, { useState, useEffect } from 'react';
import { WorkflowStep } from './WorkflowStep';
import { FileUploadWithProgress } from './FileUploadWithProgress';
import { WarmStorageVisualization } from './WarmStorageVisualization';
import { PDPProofProgress } from './PDPProofProgress';
import { BlockchainTransactionTracker } from './BlockchainTransactionTracker';
import { CDNDistributionMap } from './CDNDistributionMap';
import { SLAMonitoringPanel } from './SLAMonitoringPanel';
import { PaymentFlowVisualization } from './PaymentFlowVisualization';
import { CostBreakdownChart } from './CostBreakdownChart';
import { SynapseWrapper } from '@/lib/synapse-wrapper';

type Status = 'pending' | 'in-progress' | 'completed' | 'error';

export function IntegratedWorkflowDemo() {
  const [uploadStatus, setUploadStatus] = useState<Status>('pending');
  const [proofStatus, setProofStatus] = useState<Status>('pending');
  const [cdnStatus, setCdnStatus] = useState<Status>('pending');
  const [paymentStatus, setPaymentStatus] = useState<Status>('pending');
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    const synapse = SynapseWrapper.getInstance();

    const handleTxSubmit = (data: any) => {
      console.log('Transaction Submitted:', data);
      setTransaction(data);
    };

    const handleTxConfirm = (data: any) => {
      console.log('Transaction Confirmed:', data);
      setTransaction(null);
    };

    synapse.on('transactionSubmitted', handleTxSubmit);
    synapse.on('transactionConfirmed', handleTxConfirm);

    const runWorkflow = async () => {
      // Step 1: Upload
      setUploadStatus('in-progress');
      const bucket = await synapse.createWarmBucket('project-123', { redundancy: 3 });
      await synapse.uploadToWarm(bucket, new File([""], "test.txt"));
      setUploadStatus('completed');

      // Step 2: Proof
      setProofStatus('in-progress');
      await synapse.createProofSet(bucket, [], 90);
      setProofStatus('completed');

      // Step 3: CDN
      setCdnStatus('in-progress');
      await synapse.generateSignedUrl('bafkrei....');
      setCdnStatus('completed');

      // Step 4: Payment
      setPaymentStatus('in-progress');
      // Mock payment step
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus('completed');
    };

    runWorkflow();

    return () => {
      synapse.off('transactionSubmitted', handleTxSubmit);
      synapse.off('transactionConfirmed', handleTxConfirm);
    };
  }, []);

  return (
    <div className="space-y-8">
      <WorkflowStep
        step={1}
        title="Upload & Warm Storage"
        description="File uploaded to Filecoin Warm Storage via Synapse SDK"
        status={uploadStatus}
      >
        <FileUploadWithProgress />
        <WarmStorageVisualization />
      </WorkflowStep>

      <WorkflowStep
        step={2}
        title="Proof Generation"
        description="Creating PDP proof set for verifiable storage"
        status={proofStatus}
      >
        <PDPProofProgress />
        {transaction && transaction.operation === 'createProofSet' && <BlockchainTransactionTracker tx={transaction} />}
      </WorkflowStep>

      <WorkflowStep
        step={3}
        title="CDN Distribution"
        description="File cached on FilCDN with guaranteed SLA"
        status={cdnStatus}
      >
        <CDNDistributionMap />
        <SLAMonitoringPanel />
      </WorkflowStep>

      <WorkflowStep
        step={4}
        title="Payment Processing"
        description="Streaming payment settlement via Filecoin Pay"
        status={paymentStatus}
      >
        <PaymentFlowVisualization />
        <CostBreakdownChart />
      </WorkflowStep>
    </div>
  );
}
