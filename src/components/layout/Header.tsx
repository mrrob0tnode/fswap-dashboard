import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatBTC, formatBRL, getBTCPrice } from '@/utils/bitcoin';

interface HeaderProps {
  balance: {
    btc: number;
    brl: number;
  };
}

export function Header({ balance }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const btcPrice = getBTCPrice();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 lg:px-6">
      <div className="flex items-center gap-4 flex-1">
        {/* Search */}
        <div className="hidden md:flex relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar transações, pagamentos..."
            className="pl-10 bg-muted border-border"
          />
        </div>
      </div>

      {/* Balance and Actions */}
      <div className="flex items-center gap-4">
        {/* BTC Price */}
        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
          <span className="text-xs text-muted-foreground">BTC/BRL</span>
          <span className="text-sm font-semibold text-foreground">
            {formatBRL(btcPrice)}
          </span>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-4 rounded-lg bg-gradient-card border border-border px-4 py-2">
          <div>
            <p className="text-xs text-muted-foreground">Saldo Total</p>
            <p className="text-lg font-bold text-primary">
              ₿ {formatBTC(balance.btc)}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBRL(balance.brl)}
            </p>
          </div>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            3
          </span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}