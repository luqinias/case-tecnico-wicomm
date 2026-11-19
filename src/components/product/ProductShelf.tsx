import { useId } from 'react'
import type { Product } from '../../types'
import { Carousel } from '../ui/Carousel'
import { SectionTitle } from '../ui/SectionTitle'
import { ProductCard } from './ProductCard'

type ProductShelfProps = { title: string; products: Product[] }

/** Prateleira: título + carrossel de cards (2/3/4/5 por vez conforme a largura). */
export function ProductShelf({ title, products }: ProductShelfProps) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className="container-page">
      <SectionTitle id={titleId} className="mb-4">
        {title}
      </SectionTitle>
      <Carousel
        label={title}
        items={products}
        getKey={(product) => product.id}
        renderItem={(product) => <ProductCard product={product} />}
        trackClassName="gap-[9px] px-px py-1 -my-1"
        itemClassName="w-[calc((100%-9px)/2)] md:w-[calc((100%-18px)/3)] lg:w-[calc((100%-27px)/4)] xl:w-[calc((100%-36px)/5)]"
        arrowsClassName="-inset-x-2 top-[38%] md:top-[141px] xl:-inset-x-px"
      />
    </section>
  )
}
