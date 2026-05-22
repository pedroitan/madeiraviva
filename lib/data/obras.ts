export type ObraStatus = 'disponivel' | 'reservada' | 'entregue'
export type ObraCategoria = 'mesa' | 'bancada' | 'instrumento' | 'outro'

export type Obra = {
  slug: string
  numero: string
  nome: string
  categoria: ObraCategoria
  materiais: string
  dimensoes: string
  dataCriacao: string
  status: ObraStatus
  destino?: string
  foto: string
  fotos: string[]
  fotosDetalhe: string[]
  descricao: string
}

export const obras: Obra[] = [
  {
    slug: 'mesa-grande-jaqueira-resina-001',
    numero: '001',
    nome: 'Mesa Grande em Jaqueira & Resina',
    categoria: 'mesa',
    materiais: 'Jaqueira nativa · 41 anos · Resina epóxi · Pó de mica dourado',
    dimensoes: '220 × 100 × 76 cm',
    dataCriacao: 'Janeiro 2025',
    status: 'entregue',
    destino: 'Residência em Itaigara, Salvador, BA',
    foto: '/images/obras/placeholder-dark.jpg',
    fotos: ['/images/obras/placeholder-dark.jpg'],
    fotosDetalhe: [],
    descricao:
      'A primeira mesa que saiu do ateliê. Os veios dessa jaqueira de 41 anos cruzam a superfície como rios vistos de cima — cada um um registro do tempo que a árvore passou crescendo no mesmo terreno onde Pedro construiu sua casa. A resina dourada não cobre a madeira: ela a revela, preenchendo as fissuras naturais e imortalizando o momento exato em que a árvore parou de crescer.',
  },
  {
    slug: 'mesa-jantar-jaqueira-resina-azul-007',
    numero: '007',
    nome: 'Mesa de Jantar em Jaqueira & Resina Azul',
    categoria: 'mesa',
    materiais: 'Jaqueira nativa · 41 anos · Resina epóxi · Pó de mica azul profundo',
    dimensoes: '200 × 95 × 76 cm',
    dataCriacao: 'Março 2025',
    status: 'disponivel',
    foto: '/images/obras/placeholder-dark.jpg',
    fotos: ['/images/obras/placeholder-dark.jpg'],
    fotosDetalhe: [],
    descricao:
      'Quando a luz natural bate na resina azul às 17h, a mesa muda de tom completamente. O pó de mica azul profundo foi escolhido para contrastar com o mel natural da jaqueira — um diálogo entre o orgânico e o mineral que só acontece quando você está presente no espaço.',
  },
  {
    slug: 'bancada-cozinha-jaqueira-resina-011',
    numero: '011',
    nome: 'Bancada de Cozinha em Jaqueira',
    categoria: 'bancada',
    materiais: 'Jaqueira nativa · 41 anos · Resina epóxi natural · Acabamento acetinado',
    dimensoes: '180 × 60 × 92 cm',
    dataCriacao: 'Fevereiro 2025',
    status: 'reservada',
    foto: '/images/obras/placeholder-dark.jpg',
    fotos: ['/images/obras/placeholder-dark.jpg'],
    fotosDetalhe: [],
    descricao:
      'Uma bancada não é apenas superfície — é o lugar onde a casa acontece. Esta peça foi desenhada para uma cozinha em que o ato de cozinhar é ritual. O acabamento acetinado não reflete muito, não esconde nada: deixa os veios da jaqueira falarem por si mesmos.',
  },
  {
    slug: 'mesa-centro-jaqueira-resina-dourada-014',
    numero: '014',
    nome: 'Mesa de Centro em Jaqueira & Resina Dourada',
    categoria: 'mesa',
    materiais: 'Jaqueira nativa · 41 anos · Resina epóxi · Pó de mica dourado · Base em ferro pintado',
    dimensoes: '120 × 70 × 42 cm',
    dataCriacao: 'Abril 2025',
    status: 'disponivel',
    foto: '/images/obras/placeholder-dark.jpg',
    fotos: ['/images/obras/placeholder-dark.jpg'],
    fotosDetalhe: [],
    descricao:
      'A menor mesa do ateliê não é menor em intenção. A escala compacta concentra tudo o que a jaqueira tem a dizer em menos espaço — os veios ficam mais densos, o contraste madeira-resina mais dramático. A base em ferro negro cria a tensão certa entre peso e leveza.',
  },
  {
    slug: 'mesa-escritorio-jaqueira-resina-020',
    numero: '020',
    nome: 'Mesa de Escritório Autoral',
    categoria: 'mesa',
    materiais: 'Jaqueira nativa · 41 anos · Resina epóxi · Pó de mica bronze · Base em madeira maciça',
    dimensoes: '160 × 80 × 76 cm',
    dataCriacao: 'Maio 2025',
    status: 'disponivel',
    foto: '/images/obras/placeholder-dark.jpg',
    fotos: ['/images/obras/placeholder-dark.jpg'],
    fotosDetalhe: [],
    descricao:
      'Uma mesa de trabalho deveria inspirar. Não apenas dar suporte ao computador, mas criar um campo de presença. Os veios desta jaqueira correm diagonalmente — quase como se a árvore estivesse apontando em uma direção. O pó de mica bronze amplifica isso sob luz quente.',
  },
  {
    slug: 'bancada-bar-jaqueira-resina-023',
    numero: '023',
    nome: 'Bancada de Bar em Jaqueira',
    categoria: 'bancada',
    materiais: 'Jaqueira nativa · 41 anos · Resina epóxi · Pó de mica cobre · Acabamento alto brilho',
    dimensoes: '200 × 50 × 110 cm',
    dataCriacao: 'Junho 2025',
    status: 'disponivel',
    foto: '/images/obras/placeholder-dark.jpg',
    fotos: ['/images/obras/placeholder-dark.jpg'],
    fotosDetalhe: [],
    descricao:
      'Uma bancada de bar pede drama. O acabamento em alto brilho multiplica as luzes do ambiente e faz o pó de mica cobre pulsar como brasa quando a iluminação baixa. Esta peça foi feita para espaços que celebram a noite.',
  },
]
