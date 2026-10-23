import type { Item } from './tipos';

// Política da DuGood, conforme os Termos de Uso do app. Usada nas páginas de empresas e ONGs.
export const politica: Record<string, Item> = {
  recebimento: {
    titulo: 'O dinheiro vai para a ONG.',
    texto: 'Como regra, a doação cai direto na conta da organização no provedor de pagamento (Stripe). A DuGood não recebe nem guarda os valores.',
  },
  verificacao: {
    titulo: 'ONGs verificadas.',
    texto: 'Antes de aprovar uma organização, a DuGood faz uma verificação cadastral e documental.',
  },
  semCusto: {
    titulo: 'Quem doa não paga a mais.',
    texto: 'O doador paga só o valor que escolheu. A remuneração da DuGood nas causas incentivadas é combinada com cada ONG, em contrato.',
  },
  prestacao: {
    titulo: 'Prestação de contas.',
    texto: 'As ONGs enviam atualizações sobre as causas a quem doou, e os recibos ficam registrados na plataforma.',
  },
  autonomia: {
    titulo: 'Autonomia da ONG.',
    texto: 'A ONG publica as causas, emite os recibos e presta contas aos doadores, com as ferramentas da plataforma.',
  },
  dados: {
    titulo: 'Dados protegidos.',
    texto: 'Os dados de quem doa são tratados conforme a LGPD e a Política de Privacidade da DuGood.',
  },
};

// Pontos e níveis do app (iguais aos do app: R$ 1 doado = 1 ponto)
export const pontos =
  'Na DuGood, cada R$ 1 doado vira 1 ponto. Com os pontos, o doador sobe de nível (Bronze, Prata, Ouro e Platina), conquista badges e desbloqueia benefícios oferecidos por marcas parceiras.';
