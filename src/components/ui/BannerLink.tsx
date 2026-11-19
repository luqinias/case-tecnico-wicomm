import { srcSet } from '../../lib/image'
import type { Banner } from '../../types'

type BannerLinkProps = {
  banner: Banner
  /** Largura exibida por breakpoint, para o navegador escolher entre 1x e 2x */
  sizes: string
  className?: string
}

/** Banner clicável com leve zoom no hover; o texto do banner vem no alt. */
export function BannerLink({ banner, sizes, className = '' }: BannerLinkProps) {
  return (
    <a href={banner.href} className={`group block overflow-hidden ${className}`}>
      <img
        src={banner.image.src}
        srcSet={srcSet(banner.image)}
        sizes={sizes}
        width={banner.image.width}
        height={banner.image.height}
        alt={banner.alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </a>
  )
}
