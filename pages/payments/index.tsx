import Layout from '@/components/layout/Layout';
import { BanknotesIcon, CreditCardIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const transactions = [
  { id: 1, type: 'Subscription', plan: 'Pro Tier', amount: '-$499.00', date: '2024-08-01', status: 'Completed' },
  { id: 2, type: 'Storage Overage', amount: '-$50.00', date: '2024-07-28', status: 'Completed' },
  { id: 3, type: 'Milestone Verification', project: 'City Tower Complex', amount: '-$10.00', date: '2024-07-25', status: 'Completed' },
  { id: 4, type: 'Deposit', amount: '+$1,000.00', date: '2024-07-20', status: 'Completed' },
];

export default function Payments() {
  return (
    <Layout showSidebar>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Payments</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
          <div className="bg-white shadow overflow-hidden rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {transaction.amount.startsWith('-') ? (
                        <ArrowDownIcon className="w-6 h-6 text-red-500 mr-4" />
                      ) : (
                        <ArrowUpIcon className="w-6 h-6 text-green-500 mr-4" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                        <p className="text-xs text-gray-500">
                          {transaction.plan ? `${transaction.plan} - ` : ''}
                          {transaction.project ? `${transaction.project} - ` : ''}
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
