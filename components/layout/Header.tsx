import Link from 'next/link';
import { ConnectWallet } from '@/components/common/ConnectWallet';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.svg" alt="ArchVault" />
            </Link>
            <h1 className="ml-4 text-xl font-bold text-gray-800">ArchVault</h1>
          </div>
          <div className="flex items-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </header>
  );
}
