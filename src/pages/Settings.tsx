import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Bell, Link2, Key, Bitcoin } from 'lucide-react';
import { PaymentIntegration } from '@/types';

const integrations: PaymentIntegration[] = [
  {
    id: '1',
    name: 'Depix',
    type: 'pix',
    status: 'active',
    icon: '🔷',
    description: 'Integração para operações via PIX',
  },
  {
    id: '2',
    name: 'Banco do Brasil',
    type: 'bank',
    status: 'inactive',
    icon: '🏦',
    description: 'Pagamento de boletos e saques',
  },
  {
    id: '3',
    name: 'Lightning Network',
    type: 'lightning',
    status: 'active',
    icon: '⚡',
    description: 'Transações rápidas via LND',
  },
  {
    id: '4',
    name: 'Bitcoin On-chain',
    type: 'onchain',
    status: 'pending',
    icon: '₿',
    description: 'Transações on-chain Bitcoin',
  },
];

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e integrações
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informações do Perfil
              </h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      defaultValue="João Silva"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="joao@example.com"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      defaultValue="+55 11 99999-9999"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF/CNPJ</Label>
                    <Input
                      id="cpf"
                      defaultValue="123.456.789-00"
                      className="mt-1 bg-background border-border"
                    />
                  </div>
                </div>
                <Button variant="bitcoin">Salvar Alterações</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Configurações de Segurança
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Alterar Senha</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="current-password">Senha atual</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="mt-1 bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">Nova senha</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="mt-1 bg-background border-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="mt-1 bg-background border-border"
                      />
                    </div>
                    <Button variant="outline">Atualizar Senha</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Autenticação de Dois Fatores</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                Integrações de Pagamento
              </h3>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <p className="font-medium text-foreground">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {integration.status === 'active' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-status-success/10 text-status-success">
                          Ativo
                        </span>
                      )}
                      {integration.status === 'inactive' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                          Inativo
                        </span>
                      )}
                      {integration.status === 'pending' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-status-warning/10 text-status-warning">
                          Pendente
                        </span>
                      )}
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Preferências de Notificação
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Transações</p>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre depósitos e saques
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Pagamentos</p>
                    <p className="text-sm text-muted-foreground">
                      Atualizações sobre status de pagamentos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Segurança</p>
                    <p className="text-sm text-muted-foreground">
                      Alertas de login e atividades suspeitas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Marketing</p>
                    <p className="text-sm text-muted-foreground">
                      Novidades e ofertas especiais
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}