import { BannerLink } from '../components/ui/BannerLink'
import { SectionTitle } from '../components/ui/SectionTitle'
import { categoryBanners } from '../data/banners'

export function CategoryBanners() {
  return (
    <section aria-labelledby="cronograma-titulo" className="container-page">
      <SectionTitle id="cronograma-titulo" className="mb-4">
        Desvende o segredo dos cabelos perfeitos com nosso cronograma capilar
      </SectionTitle>
      <ul className="grid grid-cols-2 gap-[15px] lg:grid-cols-4">
        {categoryBanners.map((banner) => (
          <li key={banner.id}>
            <BannerLink
              banner={banner}
              sizes="(min-width: 1200px) 280px, (min-width: 1024px) 24vw, 50vw"
              className="aspect-[280/416]"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
