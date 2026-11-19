import { img } from '../lib/image'
import benefitCard from '../assets/brand/benefit-card.svg'
import benefitPix from '../assets/brand/benefit-pix.svg'
import benefitStore from '../assets/brand/benefit-store.svg'
import benefitTruck from '../assets/brand/benefit-truck.svg'

// Cada linha é uma lista de trechos; `strong` marca o destaque em negrito.
export const benefits = [
  { icon: benefitPix, lines: [[{ text: '3%OFF', strong: true }, { text: ' no PIX' }]] },
  {
    icon: benefitTruck,
    lines: [[{ text: 'FRETE GRÁTIS', strong: true }], [{ text: 'acima R$149,90' }]],
  },
  {
    icon: benefitCard,
    lines: [[{ text: 'Parcele em até' }], [{ text: '6X SEM JUROS', strong: true }]],
  },
  { icon: benefitStore, lines: [[{ text: 'Nossas ' }, { text: 'LOJAS', strong: true }]] },
]

export const blogPosts = [
  {
    id: 'dermocosmeticos',
    title: 'Agora é a vez dos dermocosméticos capilares',
    excerpt:
      'Rotina sistemática de cuidados com os cabelos é uma nova tendência de beleza Há alguns anos, vimos crescer a prática do skin care, rotina de cuidados com a pele do rosto...',
    image: img('blog/dermocosmeticos', 376, 170),
    alt: 'Frascos de dermocosméticos capilares Amakha Paris',
    href: '#',
  },
  {
    id: 'bloom',
    title: 'Crie o seu perfume com Bloom Amakha Collection',
    excerpt:
      'Conheça o estojo de perfumes Bloom, lançamento mais recente da Amakha Paris, que, dentre tantos atributos singulares que possui, te permite fazer diferentes combinações de fragrâncias e criar sua assinatura pessoal...',
    image: img('blog/bloom', 376, 170),
    alt: 'Estojo de perfumes Bloom Amakha Collection com flores',
    href: '#',
  },
  {
    id: 'personalidade',
    title: 'Confiante ou poderosa? Teste sua personalidade e descocubra o seu tipo de perfume!',
    excerpt:
      'Desenvolvemos um teste rápido para você descobrir qual sua personalidade feminina: Poderosa, Confiante ou a combinação das duas...',
    image: img('blog/personalidade', 376, 170),
    alt: 'Duas mulheres representando as personalidades confiante e poderosa',
    href: '#',
  },
]

export const causes = [
  {
    id: 'pontos-de-apoio',
    title: 'Pontos de Apoio',
    text: 'Em todo o Brasil, você encontra Pontos de Apoio para adquirir os produtos. E você também pode ser o empreendedor de um deles.',
    image: img('causes/pontos-de-apoio', 130, 143),
  },
  {
    id: 'divas',
    title: 'Empreendedorismo',
    text: 'O Projeto Divas possibilita que as mulheres tenham total independência financeira com uma visão empreendedora.',
    image: img('causes/divas', 130, 143),
  },
  {
    id: 'amakha-social',
    title: 'Amakha Social',
    text: 'Ajudar o próximo é e sempre será um dos pilares da Amakha Paris. O projeto social é vital para a nossa empresa.',
    image: img('causes/amakha-social', 130, 143),
  },
]

export const instagram = {
  handle: '@amakhaoficial',
  href: 'https://www.instagram.com/amakhaoficial/',
  posts: [
    {
      id: 'dia-das-criancas',
      image: img('instagram/dia-das-criancas', 249, 249),
      alt: 'Post: Feliz Dia das Crianças, com crianças sorrindo',
    },
    {
      id: 'cuide-de-voce',
      image: img('instagram/cuide-de-voce', 249, 249),
      alt: 'Post: Cuide de você para cuidar da sua família, com suplementos Amakha',
    },
    {
      id: 'hidratacao',
      image: img('instagram/hidratacao', 249, 249),
      alt: 'Post: Hidratação para toda família, mãe e filho aplicando creme',
    },
  ],
}
