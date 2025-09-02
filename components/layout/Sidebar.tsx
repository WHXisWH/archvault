import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeIcon, FolderIcon, CircleStackIcon, CreditCardIcon, CogIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Storage', href: '/storage', icon: CircleStackIcon },
  { name: 'Payments', href: '/payments', icon: CreditCardIcon },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full flex-1 bg-surface border-r border-border">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                router.pathname.startsWith(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-gray-100 hover:text-text-DEFAULT',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              <item.icon
                className={classNames(
                  router.pathname.startsWith(item.href) ? 'text-primary' : 'text-text-muted group-hover:text-text-DEFAULT',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-border p-4">
        <div className="flex-1">
          <nav className="px-2 space-y-1">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-gray-100 hover:text-text-DEFAULT"
              >
                <item.icon className="mr-3 h-6 w-6 text-text-muted group-hover:text-text-DEFAULT" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
