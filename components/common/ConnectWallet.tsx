"use client";

import { useState } from "react";
import { useWeb3 } from "@/lib/Web3Provider";

export function ConnectWallet() {
  const { address, isConnected, isLoading, login, loginWithWallet, logout } = useWeb3();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  if (isLoading) {
    return (
      <button
        disabled
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover disabled:opacity-50"
      >
        Loading...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center">
        <span className="text-sm font-medium text-text-DEFAULT mr-3">
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 border border-border text-sm font-medium rounded-md text-text-DEFAULT bg-surface hover:bg-gray-100"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {showLoginOptions ? (
        <div className="absolute right-0 top-0 mt-12 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
          <h3 className="text-center text-sm font-semibold text-gray-800 mb-3">Choose Connection</h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                loginWithWallet();
                setShowLoginOptions(false);
              }}
              className="w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Connect Wallet (MetaMask)
            </button>
            <button
              onClick={() => {
                login();
                setShowLoginOptions(false);
              }}
              className="w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800"
            >
              Social Login
            </button>
          </div>
          <button
            onClick={() => setShowLoginOptions(false)}
            className="w-full text-center mt-3 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowLoginOptions(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}