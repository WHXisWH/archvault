import { useState } from 'react';
import { MOCK_WALLET_ADDRESS } from '@/lib/constants';

export function ConnectWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAddress(MOCK_WALLET_ADDRESS);
      setIsLoading(false);
    }, 1000);
  };

  const disconnect = () => {
    setAddress(null);
  };

  if (address) {
    return (
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-3">
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </span>
        <button
          onClick={disconnect}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isLoading}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
