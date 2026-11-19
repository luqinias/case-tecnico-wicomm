import type { NavLink } from '../types'

const links = (...labels: string[]): NavLink[] => labels.map((label) => ({ label, href: '#' }))

export const footer = {
  about:
    'O nome Amakha tem origem no idioma Zulu, uma das 11 línguas oficiais da África do Sul, e significa perfume, essência. Esse nome foi escolhido pela origem desse idioma, que..',
  social: [
    { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/amakhaparis' },
    { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@amakhaparis' },
    { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/amakhaoficial/' },
  ],
  institutional: links('Quem Somos', 'Mapa do Site'),
  representative: links('Já sou Consultor', 'Quero Ser Consultor', 'Encontre um Consultor'),
  help: links(
    'Como comprar',
    'Politica de Privacidade',
    'Politica de Entrega',
    'Trocas Devoluções/Reembolsos',
  ),
  phone: { label: '(11) 2388-8203', note: '(custo de ligação local)', href: 'tel:+551123888203' },
  email: 'suporte@amakhaparis.com.br',
  // Cada item de `lines` começa numa nova linha, como no Figma
  locations: [
    {
      icon: 'location',
      title: 'Sede:',
      lines: ['R. do Sacramento, 522', 'São Bernardo do Campo – SP 09640-000'],
    },
    {
      icon: 'location-tick',
      title: 'Filial Manaus:',
      lines: ['', 'Pc Chile, Nº 80 – Adrianópolis'],
    },
    { icon: 'location-tick', title: 'Filial Belém:', lines: ['', 'Av Nazaré, Nº 731 – Nazaré'] },
  ],
} as const
