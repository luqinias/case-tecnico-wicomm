import { BannerLink } from '../components/ui/BannerLink'
import { SectionTitle } from '../components/ui/SectionTitle'
import { launchBanners } from '../data/banners'

export function LaunchBanners() {
  return (
    <section aria-labelledby="lancamentos-titulo" className="container-page">
      <SectionTitle id="lancamentos-titulo" className="mb-4">
        Potencialize sua saúde com os nossos lançamentos
      </SectionTitle>
      <div className="grid gap-[15px] md:grid-cols-[556fr_597fr]">
        <BannerLink
          banner={launchBanners.featured}
          sizes="(min-width: 1200px) 556px, (min-width: 768px) 48vw, 100vw"
          className="aspect-[556/681]"
        />
        <div className="grid gap-[15px]">
          {launchBanners.side.map((banner) => (
            <BannerLink
              key={banner.id}
              banner={banner}
              sizes="(min-width: 1200px) 597px, (min-width: 768px) 52vw, 100vw"
              className="aspect-[597/333] md:aspect-auto"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
