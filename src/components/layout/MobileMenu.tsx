import { mainNav } from '../../data/navigation'
import { Drawer } from '../ui/Drawer'
import { Icon } from '../ui/Icon'

type MobileMenuProps = { open: boolean; onClose: () => void }

/** Navegação em gaveta para telas menores que desktop; submenus com <details>. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Menu" side="left">
      <nav aria-label="Categorias">
        <ul className="divide-y divide-line">
          {mainNav.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <details className="group/details">
                  <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 text-sm font-medium uppercase [&::-webkit-details-marker]:hidden">
                    {item.icon && <Icon name={item.icon} size={24} />}
                    <span className="flex-1">{item.label}</span>
                    <Icon
                      name="chevron-down"
                      className="text-ink-icon transition-transform group-open/details:rotate-180"
                    />
                  </summary>
                  <ul className="bg-surface-50 pb-2">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={onClose}
                          className="block px-8 py-2.5 text-sm hover:bg-surface"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-brand uppercase"
                >
                  {item.icon && <Icon name={item.icon} size={24} />}
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  )
}
