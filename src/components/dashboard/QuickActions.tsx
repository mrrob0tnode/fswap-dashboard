import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, QrCode, FileText, Zap, Bitcoin } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      label: 'Depositar',
      icon: ArrowDownLeft,
      variant: 'bitcoin' as const,
      onClick: () => console.log('Depositar'),
    },
    {
      label: 'Sacar',
      icon: ArrowUpRight,
      variant: 'outline' as const,
      onClick: () => console.log('Sacar'),
    },
    {
      label: 'PIX',
      icon: QrCode,
      variant: 'outline' as const,
      onClick: () => console.log('PIX'),
    },
    {
      label: 'Boleto',
      icon: FileText,
      variant: 'outline' as const,
      onClick: () => console.log('Boleto'),
    },
    {
      label: 'Lightning',
      icon: Zap,
      variant: 'outline' as const,
      onClick: () => console.log('Lightning'),
    },
    {
      label: 'On-chain',
      icon: Bitcoin,
      variant: 'outline' as const,
      onClick: () => console.log('On-chain'),
    },
  ];

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="lg"
            className="flex flex-col h-auto py-4 gap-2"
            onClick={action.onClick}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-sm">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}