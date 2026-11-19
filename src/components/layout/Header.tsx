import { useState } from 'react'
import logo from '../../assets/brand/logo.svg'
import { useCart } from '../../context/cartContext'
import { useFavorites } from '../../context/favoritesContext'
import { Icon } from '../ui/Icon'
import { MainNav } from './MainNav'
import { MobileMenu } from './MobileMenu'
import { SearchBar } from './SearchBar'

/** Contador circular (14px) sobre os ícones do header. */
function CountBadge({ value }: { value: number }) {
  if (!value) return null
  return (
    <span
      aria-hidden="true"
      className="absolute top-0.5 left-4 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-ink px-0.5 font-inter text-[8px] leading-none font-semibold text-white"
    >
      {value > 99 ? '99+' : value}
    </span>
  )
}

const iconButton =
  'relative grid size-[30px] shrink-0 cursor-pointer place-items-center rounded-full bg-white transition hover:bg-surface'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cart = useCart()
  const favorites = useFavorites()

  return (
    <header className="relative z-30 bg-white shadow-header">
      <div className="container-page flex flex-col gap-3 pt-3 pb-3 lg:gap-4 lg:pt-[15px] lg:pb-4">
        <div className="flex items-center gap-3 lg:h-[55px] lg:gap-[19px]">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            className="-ml-1.5 grid size-10 cursor-pointer place-items-center lg:hidden"
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
              <span className="h-0.5 rounded bg-ink" />
              <span className="h-0.5 rounded bg-ink" />
              <span className="h-0.5 rounded bg-ink" />
            </span>
          </button>

          <a href="/" className="shrink-0 lg:mr-[41px]">
            <img
              src={logo}
              alt="Amakha Paris - página inicial"
              width={108}
              height={54}
              className="h-10 w-auto lg:h-[54px]"
            />
          </a>

          <SearchBar className="hidden flex-1 lg:block" />

          <div className="ml-auto flex items-center gap-2">
            <a
              href="#"
              className="flex h-10 items-center gap-2 rounded bg-brand px-2.5 transition hover:brightness-95 lg:h-[52px] lg:px-[18px]"
            >
              <Icon name="profile" />
              <span className="hidden text-xs leading-[1.3] sm:block">
                MINHA CONTA
                <br />
                Entre ou cadastra-se
              </span>
              <span className="sr-only sm:hidden">Minha conta</span>
            </a>
            <a href="#" className={iconButton} aria-label={`Favoritos (${favorites.count})`}>
              <Icon name="heart" size={22} />
              <CountBadge value={favorites.count} />
            </a>
            <button
              type="button"
              onClick={cart.open}
              className={iconButton}
              aria-label={`Abrir carrinho (${cart.count} ${cart.count === 1 ? 'item' : 'itens'})`}
            >
              <Icon name="bag" />
              <CountBadge value={cart.count} />
            </button>
          </div>
        </div>

        <SearchBar className="lg:hidden" />
        <MainNav />
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
