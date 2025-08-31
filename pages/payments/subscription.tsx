import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Starter',
    price: 99,
    features: [
      '100GB Warm Storage',
      '1TB monthly bandwidth',
      'Daily PDP verification',
      '99% availability SLA',
    ],
  },
  {
    name: 'Professional',
    price: 499,
    features: [
      '1TB Warm Storage',
      '10TB monthly bandwidth',
      'Hourly PDP verification',
      '99.9% availability SLA',
      'FilCDN acceleration',
    ],
    isCurrent: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited storage',
      'Dedicated infrastructure',
      'Custom PDP schedules',
      '99.99% availability SLA',
      'White-label options',
    ],
  },
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  return (
    <Layout showSidebar>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Subscription</h1>
        <p className="text-lg text-gray-600 mb-8">Choose the plan that fits your needs.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg p-6 flex flex-col ${selectedPlan === plan.name ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">{typeof plan.price === 'number' ? `$${plan.price}` : ''}</span>
                <span className="text-base font-medium text-gray-500">{typeof plan.price === 'number' ? '/mo' : 'Contact Us'}</span>
              </p>
              <ul className="mt-6 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 block w-full py-2 px-4 rounded-md text-center font-medium ${plan.isCurrent ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                disabled={plan.isCurrent}
              >
                {plan.isCurrent ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
