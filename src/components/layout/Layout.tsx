import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useBalance } from '@/hooks/useBalance';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { balance } = useBalance();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header balance={balance} />
      <main className="lg:ml-64 pt-16">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}