import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function PaymentDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <BanknotesIcon className="w-8 h-8 text-green-500 mr-4" />
          <div>
            <p className="text-sm font-medium text-gray-500">Current Balance</p>
            <p className="text-2xl font-semibold text-gray-900">$441.00</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <CreditCardIcon className="w-8 h-8 text-blue-500 mr-4" />
          <div>
            <p className="text-sm font-medium text-gray-500">Active Subscription</p>
            <p className="text-2xl font-semibold text-gray-900">Pro Tier</p>
          </div>
        </div>
        <div className="mt-4 text-sm">
          <Link href="/payments/subscription" className="font-medium text-blue-600 hover:text-blue-500">
            Manage Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}
