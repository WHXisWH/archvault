import Header from './Header';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  showSidebar?: boolean;
};

export default function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <div className="w-64">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
