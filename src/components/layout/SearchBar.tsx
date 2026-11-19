import { useId, useMemo, useRef, useState, type FocusEvent, type FormEvent } from 'react'
import { useCart } from '../../context/cartContext'
import { products } from '../../data/products'
import { formatBRL } from '../../lib/format'
import { Icon } from '../ui/Icon'

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

/** Busca com sugestões do catálogo local; cada sugestão adiciona o produto ao carrinho. */
export function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { add } = useCart()
  const inputId = useId()
  const resultsId = useId()

  const term = normalize(query.trim())
  const results = useMemo(
    () =>
      term.length < 2 ? [] : products.filter((p) => normalize(p.name).includes(term)).slice(0, 5),
    [term],
  )
  const showPanel = open && term.length >= 2

  // Fecha o painel quando o foco sai do formulário (input ou sugestões).
  const closeIfFocusLeaves = (event: FocusEvent) => {
    if (!formRef.current?.contains(event.relatedTarget)) setOpen(false)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setOpen(true)
    inputRef.current?.focus()
  }

  return (
    <search className={className}>
      <form ref={formRef} onSubmit={onSubmit} className="relative flex h-[52px]">
        <label htmlFor={inputId} className="sr-only">
          Buscar produtos
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={closeIfFocusLeaves}
          onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
          placeholder="Qual produto você procura?"
          autoComplete="off"
          aria-controls={resultsId}
          className="min-w-0 flex-1 rounded-l-[5px] border border-r-0 border-surface-50 bg-surface pl-[26px] text-sm tracking-[0.2px] placeholder:text-ink-muted focus-visible:outline-offset-0"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="grid w-[60px] shrink-0 cursor-pointer place-items-center rounded-r-[5px] border border-surface-50 bg-brand transition hover:brightness-95"
        >
          <Icon name="search" />
        </button>

        <div
          id={resultsId}
          hidden={!showPanel}
          className="absolute inset-x-0 top-full z-40 mt-1 rounded bg-white p-2 shadow-dropdown"
        >
          <p aria-live="polite" className="px-2 py-1 text-xs text-ink-muted">
            {showPanel &&
              (results.length
                ? `${results.length} produto(s) para "${query.trim()}"`
                : `Nenhum produto encontrado para "${query.trim()}"`)}
          </p>
          <ul>
            {results.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => {
                    add(product.id)
                    setOpen(false)
                  }}
                  onBlur={closeIfFocusLeaves}
                  className="flex w-full cursor-pointer items-center gap-3 rounded p-2 text-left text-sm hover:bg-surface"
                >
                  <img src={product.image.src} alt="" width={40} height={40} className="size-10" />
                  <span className="flex-1">{product.name}</span>
                  <span className="font-bold whitespace-nowrap">{formatBRL(product.price)}</span>
                  <span className="sr-only">, adicionar ao carrinho</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </search>
  )
}
