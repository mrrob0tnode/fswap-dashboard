import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TransactionsList } from '@/components/dashboard/TransactionsList';
import { Transaction } from '@/types';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Extended mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    method: 'pix',
    amount: 500,
    currency: 'BRL',
    status: 'completed',
    description: 'Depósito via PIX - João Silva',
    pixKey: 'joao.silva@email.com',
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
    description: 'Pagamento de boleto - Conta de luz',
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
  {
    id: '5',
    type: 'deposit',
    method: 'bank_transfer',
    amount: 2500,
    currency: 'BRL',
    status: 'completed',
    description: 'TED - Banco do Brasil',
    createdAt: new Date('2024-01-14T14:20:00'),
    completedAt: new Date('2024-01-14T14:25:00'),
    fee: 15,
  },
  {
    id: '6',
    type: 'withdrawal',
    method: 'pix',
    amount: 1000,
    currency: 'BRL',
    status: 'failed',
    description: 'Saque PIX - Chave inválida',
    pixKey: 'invalid-key',
    createdAt: new Date('2024-01-14T10:00:00'),
  },
  {
    id: '7',
    type: 'payment',
    method: 'lightning',
    amount: 50000,
    currency: 'BTC',
    status: 'completed',
    description: 'Pagamento Lightning - Serviço VPN',
    createdAt: new Date('2024-01-13T22:15:00'),
    completedAt: new Date('2024-01-13T22:15:30'),
    fee: 5,
  },
  {
    id: '8',
    type: 'deposit',
    method: 'pix',
    amount: 750,
    currency: 'BRL',
    status: 'completed',
    description: 'Depósito PIX - Maria Oliveira',
    pixKey: '+5511999999999',
    createdAt: new Date('2024-01-13T16:45:00'),
    completedAt: new Date('2024-01-13T16:46:00'),
  },
];

export default function Transactions() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transações</h1>
          <p className="text-muted-foreground">
            Gerencie e acompanhe todas as suas transações
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição, ID, hash..."
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Período</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] bg-background border-border">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="deposit">Depósitos</SelectItem>
                  <SelectItem value="withdrawal">Saques</SelectItem>
                  <SelectItem value="payment">Pagamentos</SelectItem>
                  <SelectItem value="transfer">Transferências</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] bg-background border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] bg-background border-border">
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="lightning">Lightning</SelectItem>
                  <SelectItem value="onchain">On-chain</SelectItem>
                  <SelectItem value="bank_transfer">TED/DOC</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Transactions List */}
        <TransactionsList transactions={mockTransactions} />
      </div>
    </Layout>
  );
}