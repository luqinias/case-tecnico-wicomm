import { useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { mainNav } from '../../data/navigation'
import type { NavItem } from '../../types'
import { Icon } from '../ui/Icon'

const pill =
  'flex h-9 items-center gap-2 rounded px-2.5 text-[13px] leading-[1.3] font-medium uppercase whitespace-nowrap transition-colors xl:px-[18px] xl:text-sm'

/**
 * Item com submenu: abre no hover via CSS (mouse) e no clique/Enter (teclado e touch).
 * Esc fecha e devolve o foco ao botão; o foco saindo do item também fecha.
 */
function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const itemRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const closeIfFocusLeaves = (event: FocusEvent) => {
    if (!itemRef.current?.contains(event.relatedTarget)) setOpen(false)
  }

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return
    setOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <li ref={itemRef} className="group/nav relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        onBlur={closeIfFocusLeaves}
        onKeyDown={closeOnEscape}
        className={`${pill} cursor-pointer bg-surface-50 hover:bg-surface ${
          item.highlight ? 'border border-brand' : ''
        }`}
      >
        {item.icon && <Icon name={item.icon} size={24} />}
        {item.label}
        <Icon
          name="chevron-down"
          className={`transition-transform group-hover/nav:rotate-180 ${open ? 'rotate-180' : ''} ${
            item.highlight ? 'text-ink' : 'text-ink-icon'
          }`}
        />
      </button>

      {/* Painel no estilo do submenu "CONSULTOR" do Figma */}
      <ul
        id={menuId}
        className={`absolute top-full left-0 z-40 w-[172px] flex-col gap-1 bg-white p-2.5 shadow-dropdown group-hover/nav:flex ${
          open ? 'flex' : 'hidden'
        }`}
      >
        {item.children?.map((child, index) => (
          <li key={child.label}>
            <a
              href={child.href}
              onBlur={closeIfFocusLeaves}
              onKeyDown={closeOnEscape}
              className={`flex h-10 items-center justify-center rounded px-3 text-center text-[10px] leading-[1.3] font-medium transition-colors hover:bg-brand ${
                item.highlight && index === 0 ? 'bg-brand' : 'bg-surface'
              }`}
            >
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function MainNav() {
  return (
    <nav aria-label="Categorias" className="hidden lg:block">
      <ul className="flex items-center justify-between gap-2">
        {mainNav.map((item) =>
          item.children ? (
            <NavDropdown key={item.label} item={item} />
          ) : (
            <li key={item.label}>
              <a href={item.href} className={`${pill} text-brand hover:underline`}>
                {item.icon && <Icon name={item.icon} size={24} />}
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}
