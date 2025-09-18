import { Layout } from '@/components/layout/Layout';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { TransactionsList } from '@/components/dashboard/TransactionsList';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Transaction } from '@/types';
import { useBalance } from '@/hooks/useBalance';
import { formatBRL, formatBTC } from '@/utils/bitcoin';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity, 
  TrendingUp,
  Bitcoin,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';

// Mock data - In production, this would come from an API
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    method: 'pix',
    amount: 500,
    currency: 'BRL',
    status: 'completed',
    description: 'Depósito via PIX',
    createdAt: new Date('2024-01-15T10:30:00'),
    completedAt: new Date('2024-01-15T10:31:00'),
  },
  {
    id: '2',
    type: 'withdrawal',
    method: 'lightning',
    amount: 100000,
    currency: 'BTC',
    status: 'processing',
    description: 'Saque Lightning Network',
    createdAt: new Date('2024-01-15T09:15:00'),
    fee: 10,
  },
  {
    id: '3',
    type: 'payment',
    method: 'boleto',
    amount: 250.75,
    currency: 'BRL',
    status: 'pending',
    description: 'Pagamento de boleto',
    boletoCode: '34191.79001 01043.510047 91020.150008 8 96250000012575',
    createdAt: new Date('2024-01-15T08:00:00'),
    fee: 1,
  },
  {
    id: '4',
    type: 'transfer',
    method: 'onchain',
    amount: 500000,
    currency: 'BTC',
    status: 'completed',
    description: 'Transferência Bitcoin',
    hash: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    createdAt: new Date('2024-01-14T18:45:00'),
    completedAt: new Date('2024-01-14T19:30:00'),
    fee: 5000,
  },
];

export default function Dashboard() {
  const { balance } = useBalance();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da sua conta e atividades recentes
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Saldo em Bitcoin"
            value={`₿ ${formatBTC(balance.btc)}`}
            subtitle={formatBRL(balance.brl)}
            icon={<Bitcoin className="h-6 w-6 text-bitcoin-orange" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricsCard
            title="Volume Total"
            value={formatBRL(125000)}
            subtitle="Últimos 30 dias"
            icon={<DollarSign className="h-6 w-6 text-status-success" />}
            trend={{ value: 8.2, isPositive: true }}
          />
          <MetricsCard
            title="Transações"
            value="147"
            subtitle="Este mês"
            icon={<Activity className="h-6 w-6 text-status-info" />}
            trend={{ value: 3.1, isPositive: false }}
          />
          <MetricsCard
            title="Taxa de Sucesso"
            value="98.5%"
            subtitle="Aprovação de transações"
            icon={<CheckCircle className="h-6 w-6 text-status-success" />}
            trend={{ value: 0.5, isPositive: true }}
          />
        </div>

        {/* Quick Actions and Recent Transactions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          <div className="lg:col-span-2">
            <TransactionsList transactions={mockTransactions} />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid gap-4 md:grid-cols-2">
          <MetricsCard
            title="Entradas"
            value={formatBRL(75000)}
            subtitle="Total de depósitos este mês"
            icon={<ArrowDownLeft className="h-6 w-6 text-status-success" />}
            trend={{ value: 15.3, isPositive: true }}
          />
          <MetricsCard
            title="Saídas"
            value={formatBRL(50000)}
            subtitle="Total de saques este mês"
            icon={<ArrowUpRight className="h-6 w-6 text-status-error" />}
            trend={{ value: 5.7, isPositive: false }}
          />
        </div>
      </div>
    </Layout>
  );
}