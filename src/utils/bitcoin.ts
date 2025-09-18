// Bitcoin utilities
export function satoshisToBTC(satoshis: number): number {
  return satoshis / 100000000;
}

export function btcToSatoshis(btc: number): number {
  return Math.floor(btc * 100000000);
}

export function formatBTC(satoshis: number): string {
  const btc = satoshisToBTC(satoshis);
  return btc.toFixed(8).replace(/\.?0+$/, '');
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Mock BTC price - In production, this would come from an API
export function getBTCPrice(): number {
  return 195000; // R$ 195,000 per BTC
}

export function convertBTCToBRL(satoshis: number): number {
  const btc = satoshisToBTC(satoshis);
  const price = getBTCPrice();
  return btc * price;
}

export function formatSatoshis(satoshis: number): string {
  return new Intl.NumberFormat('pt-BR').format(satoshis);
}