import { BannerLink } from '../components/ui/BannerLink'
import { consultantBanners } from '../data/banners'

export function ConsultantBanners() {
  return (
    <section aria-label="Seja um consultor" className="container-page">
      <div className="grid gap-5 md:grid-cols-2">
        {consultantBanners.map((banner) => (
          <BannerLink
            key={banner.id}
            banner={banner}
            sizes="(min-width: 1200px) 575px, (min-width: 768px) 50vw, 100vw"
            className="aspect-[575/333]"
          />
        ))}
      </div>
    </section>
  )
}
