import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

const transactions = [
  { id: 1, type: 'Subscription', plan: 'Pro Tier', amount: '-$499.00', date: '2024-08-01', status: 'Completed' },
  { id: 2, type: 'Storage Overage', amount: '-$50.00', date: '2024-07-28', status: 'Completed' },
  { id: 3, type: 'Milestone Verification', project: 'City Tower Complex', amount: '-$10.00', date: '2024-07-25', status: 'Completed' },
  { id: 4, type: 'Deposit', amount: '+$1,000.00', date: '2024-07-20', status: 'Completed' },
];

export function TransactionHistory() {
  return (
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
  );
}
