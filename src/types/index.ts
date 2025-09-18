export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface Balance {
  btc: number; // In satoshis
  brl: number; // Calculated from BTC
  lastUpdate: Date;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'transfer';
  method: 'pix' | 'boleto' | 'lightning' | 'onchain' | 'bank_transfer';
  amount: number;
  currency: 'BTC' | 'BRL';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  description: string;
  hash?: string;
  pixKey?: string;
  boletoCode?: string;
  createdAt: Date;
  completedAt?: Date;
  fee?: number;
}

export interface PaymentIntegration {
  id: string;
  name: string;
  type: 'pix' | 'bank' | 'lightning' | 'onchain';
  status: 'active' | 'inactive' | 'pending';
  icon: string;
  description: string;
  config?: Record<string, any>;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  permissions: string[];
}

export interface DashboardMetrics {
  totalTransactions: number;
  totalVolumeBRL: number;
  totalVolumeBTC: number;
  pendingTransactions: number;
  successRate: number;
  averageTransactionTime: number;
}