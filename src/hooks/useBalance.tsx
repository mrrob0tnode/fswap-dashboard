import { useState, useEffect } from 'react';
import { convertBTCToBRL } from '@/utils/bitcoin';

export function useBalance() {
  // Mock balance - In production, this would come from an API
  const [balance, setBalance] = useState({
    btc: 12345678, // satoshis
    brl: 0,
  });

  useEffect(() => {
    // Update BRL value based on current BTC price
    const brlValue = convertBTCToBRL(balance.btc);
    setBalance(prev => ({ ...prev, brl: brlValue }));

    // Simulate real-time updates
    const interval = setInterval(() => {
      const brlValue = convertBTCToBRL(balance.btc);
      setBalance(prev => ({ ...prev, brl: brlValue }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [balance.btc]);

  return { balance, setBalance };
}