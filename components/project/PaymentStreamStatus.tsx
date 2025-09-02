
import { CreditCardIcon, ArrowsRightLeftIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface PaymentStreamStatusProps {
  subscriptions: any[];
  usageBasedCharges: any;
  providerPayouts: any[];
}

export function PaymentStreamStatus({ subscriptions, usageBasedCharges, providerPayouts }: PaymentStreamStatusProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Payment & Billing</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <CreditCardIcon className="w-6 h-6 text-green-500 mr-3" />
            <h4 className="font-semibold text-gray-700">Subscriptions</h4>
          </div>
          <div className="text-sm text-gray-600 pl-9">
            <p>Status: <span className="font-medium text-green-600">Active</span></p>
            <p>Next Billing: <span className="font-medium">2023-11-15</span></p>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <ArrowsRightLeftIcon className="w-6 h-6 text-indigo-500 mr-3" />
            <h4 className="font-semibold text-gray-700">Usage-based Streaming</h4>
          </div>
          <div className="text-sm text-gray-600 pl-9">
            <p>Current Month Est.: <span className="font-medium">$41.80</span></p>
            <p>Active Streams: <span className="font-medium">3</span></p>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <BanknotesIcon className="w-6 h-6 text-blue-500 mr-3" />
            <h4 className="font-semibold text-gray-700">Provider Payouts</h4>
          </div>
          <div className="text-sm text-gray-600 pl-9">
            <p>Total Settled: <span className="font-medium">$156.40</span></p>
            <p>Providers Paid: <span className="font-medium">5</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
