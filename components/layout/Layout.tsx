import Header from './Header';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  showSidebar?: boolean;
};

export default function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        {showSidebar && (
          <div className="w-64 bg-gray-800">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
