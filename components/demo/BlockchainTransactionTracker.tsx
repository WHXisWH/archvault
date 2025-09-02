
interface BlockchainTransactionTrackerProps {
  tx: {
    txHash: string;
    operation: string;
    params: any;
  };
}

export function BlockchainTransactionTracker({ tx }: BlockchainTransactionTrackerProps) {
  if (!tx) return null;

  return (
    <div className="p-4 border rounded-md bg-blue-50 mt-4">
      <p className="text-sm font-medium text-blue-700">Blockchain Tx Submitted</p>
      <p className="text-xs text-gray-600 mt-1">Operation: {tx.operation}</p>
      <p className="text-xs text-gray-600 mt-1 truncate">Hash: {tx.txHash}</p>
    </div>
  );
}
