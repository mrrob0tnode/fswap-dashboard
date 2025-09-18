import { Transaction } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatBTC, formatBRL } from '@/utils/bitcoin';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionsListProps {
  transactions: Transaction[];
}

const statusConfig = {
  pending: { label: 'Pendente', icon: Clock, color: 'text-status-warning' },
  processing: { label: 'Processando', icon: AlertCircle, color: 'text-status-info' },
  completed: { label: 'Concluída', icon: CheckCircle, color: 'text-status-success' },
  failed: { label: 'Falhou', icon: XCircle, color: 'text-status-error' },
  cancelled: { label: 'Cancelada', icon: XCircle, color: 'text-muted-foreground' },
};

const methodLabels = {
  pix: 'PIX',
  boleto: 'Boleto',
  lightning: 'Lightning',
  onchain: 'On-chain',
  bank_transfer: 'TED/DOC',
};

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <Card className="bg-gradient-card border-border">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">Últimas Transações</h3>
        <div className="mt-4 space-y-3">
          {transactions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              Nenhuma transação encontrada
            </p>
          ) : (
            transactions.map((transaction) => {
              const StatusIcon = statusConfig[transaction.status].icon;
              const isIncoming = transaction.type === 'deposit';
              
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg bg-background/50 p-4 hover:bg-background/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isIncoming ? "bg-status-success/10" : "bg-status-error/10"
                    )}>
                      {isIncoming ? (
                        <ArrowDownLeft className="h-5 w-5 text-status-success" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-status-error" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {methodLabels[transaction.method]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={cn(
                        "font-semibold",
                        isIncoming ? "text-status-success" : "text-foreground"
                      )}>
                        {isIncoming ? '+' : '-'}
                        {transaction.currency === 'BTC' 
                          ? `₿ ${formatBTC(transaction.amount)}`
                          : formatBRL(transaction.amount)
                        }
                      </p>
                      {transaction.fee && (
                        <p className="text-xs text-muted-foreground">
                          Taxa: {formatBRL(transaction.fee)}
                        </p>
                      )}
                    </div>
                    <StatusIcon className={cn("h-5 w-5", statusConfig[transaction.status].color)} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
}