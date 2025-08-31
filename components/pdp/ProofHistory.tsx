import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import type { PDPProof } from '@/lib/types';

const proofHistory: PDPProof[] = [
  {
    proofSetId: 'pdp-set-1',
    rootCids: ['bafk...1'],
    createdAt: new Date('2025-08-28T10:00:00Z'),
    lastVerified: new Date('2025-08-30T10:00:00Z'),
    nextVerification: new Date('2025-09-06T10:00:00Z'),
    status: 'verified',
    txHash: '0xabc...def',
  },
  {
    proofSetId: 'pdp-set-2',
    rootCids: ['bafk...2'],
    createdAt: new Date('2025-08-21T10:00:00Z'),
    lastVerified: new Date('2025-08-23T10:00:00Z'),
    nextVerification: new Date('2025-08-30T10:00:00Z'),
    status: 'verified',
    txHash: '0x123...456',
  },
  {
    proofSetId: 'pdp-set-3',
    rootCids: ['bafk...3'],
    createdAt: new Date('2025-08-14T10:00:00Z'),
    lastVerified: new Date('2025-08-16T10:00:00Z'),
    nextVerification: new Date('2025-08-23T10:00:00Z'),
    status: 'failed',
    txHash: '0x789...abc',
  },
];

export function ProofHistory() {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <h3 className="text-lg font-medium text-gray-900 p-6">Proof History</h3>
      <ul role="list" className="divide-y divide-gray-200">
        {proofHistory.map((proof) => (
          <li key={proof.proofSetId} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {proof.status === 'verified' ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-4" />
                ) : (
                  <ExclamationCircleIcon className="w-6 h-6 text-red-500 mr-4" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{proof.status === 'verified' ? 'Verification Successful' : 'Verification Failed'}</p>
                  <p className="text-xs text-gray-500">Verified on: {proof.lastVerified.toLocaleDateString()}</p>
                </div>
              </div>
              <a href={`https://filfox.info/en/message/${proof.txHash}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                View Transaction
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
