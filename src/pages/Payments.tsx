import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, FileText, Building2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { formatBRL } from '@/utils/bitcoin';

export default function Payments() {
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedBoleto, setCopiedBoleto] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCopyBoleto = () => {
    navigator.clipboard.writeText('34191.79001 01043.510047 91020.150008 8 96250000012575');
    setCopiedBoleto(true);
    setTimeout(() => setCopiedBoleto(false), 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pagamentos</h1>
          <p className="text-muted-foreground">
            Realize pagamentos via PIX, boleto e transferências bancárias
          </p>
        </div>

        {/* Payment Tabs */}
        <Tabs defaultValue="pix" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
            <TabsTrigger value="pix">PIX</TabsTrigger>
            <TabsTrigger value="boleto">Boleto</TabsTrigger>
            <TabsTrigger value="bank">Banco</TabsTrigger>
          </TabsList>

          <TabsContent value="pix" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  Enviar PIX
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pix-key">Chave PIX</Label>
                    <Input
                      id="pix-key"
                      placeholder="Email, CPF/CNPJ, telefone ou chave aleatória"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pix-amount">Valor</Label>
                    <Input
                      id="pix-amount"
                      type="number"
                      placeholder="R$ 0,00"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pix-description">Descrição (opcional)</Label>
                    <Input
                      id="pix-description"
                      placeholder="Descrição do pagamento"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <Button className="w-full" variant="bitcoin">
                    Enviar Pagamento
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Receber PIX
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-center p-4 bg-background rounded-lg">
                    <div className="bg-white p-4 rounded-lg">
                      <QrCode className="h-32 w-32 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <Label>Código PIX Copia e Cola</Label>
                    <div className="mt-1 flex gap-2">
                      <Input
                        value="00020126580014BR.GOV.BCB.PIX0136123e4567..."
                        readOnly
                        className="bg-background border-border"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopyPix}
                      >
                        {copiedPix ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Use este QR Code ou código para receber pagamentos instantâneos via PIX
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="boleto" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Pagar Boleto
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="boleto-code">Código de barras</Label>
                    <Input
                      id="boleto-code"
                      placeholder="Digite ou cole o código de barras"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vencimento:</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Beneficiário:</span>
                      <span className="font-medium">-</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="bitcoin">
                    Pagar Boleto
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Gerar Boleto
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="boleto-amount">Valor</Label>
                    <Input
                      id="boleto-amount"
                      type="number"
                      placeholder="R$ 0,00"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="boleto-due">Vencimento</Label>
                    <Input
                      id="boleto-due"
                      type="date"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="boleto-description">Descrição</Label>
                    <Input
                      id="boleto-description"
                      placeholder="Descrição do boleto"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <Button className="w-full" variant="outline">
                    Gerar Boleto
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Transferência Bancária
              </h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Dados do Destinatário</h4>
                  <div>
                    <Label htmlFor="bank-name">Banco</Label>
                    <Input
                      id="bank-name"
                      placeholder="Ex: Banco do Brasil"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-agency">Agência</Label>
                    <Input
                      id="bank-agency"
                      placeholder="0000"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-account">Conta</Label>
                    <Input
                      id="bank-account"
                      placeholder="00000-0"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-cpf">CPF/CNPJ</Label>
                    <Input
                      id="bank-cpf"
                      placeholder="000.000.000-00"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Detalhes da Transferência</h4>
                  <div>
                    <Label htmlFor="transfer-type">Tipo</Label>
                    <select
                      id="transfer-type"
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    >
                      <option>TED</option>
                      <option>DOC</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="transfer-amount">Valor</Label>
                    <Input
                      id="transfer-amount"
                      type="number"
                      placeholder="R$ 0,00"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transfer-description">Descrição</Label>
                    <Input
                      id="transfer-description"
                      placeholder="Descrição da transferência"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6" variant="bitcoin">
                Realizar Transferência
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}