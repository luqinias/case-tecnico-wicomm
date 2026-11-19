import { Icon } from '../ui/Icon'

/** Botão flutuante; o rótulo "Fale com a gente" (camada oculta no Figma) expande no hover/foco. */
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/551123888203"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-4 bottom-4 z-20 flex h-[46px] items-center gap-2.5 rounded-full border border-white bg-whatsapp px-3 text-white shadow-dropdown transition-all md:right-[max(24px,calc((100vw-1168px)/2))] md:bottom-6"
    >
      <Icon name="whatsapp" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-focus-visible:max-w-40">
        Fale com a gente
      </span>
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </a>
  )
}
