import type { NavItem, NavLink } from '../types'

const sub = (...labels: string[]): NavLink[] => labels.map((label) => ({ label, href: '#' }))

export const mainNav: NavItem[] = [
  {
    label: 'Perfumaria',
    href: '#',
    children: sub(
      'Perfumes Femininos',
      'Perfumes Masculinos',
      'Perfumes de Bolso',
      'Body Splash',
      'Kits',
    ),
  },
  {
    label: 'Cabelos',
    href: '#',
    children: sub('Shampoos', 'Condicionadores', 'Máscaras', 'Finalizadores', 'Cronograma Capilar'),
  },
  {
    label: 'Corpo e Banho',
    href: '#',
    children: sub('Hidratantes', 'Sabonetes', 'Esfoliantes', 'Desodorantes'),
  },
  {
    label: 'Rosto',
    href: '#',
    children: sub('Limpeza', 'Hidratação', 'Maquiagem', 'Protetor Solar'),
  },
  {
    label: 'Nutricional',
    href: '#',
    children: sub('Suplementos', 'Vitaminas', 'Ômega 3', 'Chás e Bebidas'),
  },
  {
    label: 'Revenda',
    href: '#',
    icon: 'people',
    highlight: true,
    children: sub(
      'Quero ser Consultor',
      'Já sou Consultor',
      'Encontre um Consultor',
      'Criar Minha Loja Online',
    ),
  },
  { label: 'Promoções', href: '#', icon: 'discount' },
]
