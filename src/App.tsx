import { MiniCart } from './components/cart/MiniCart'
import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { ProductShelf } from './components/product/ProductShelf'
import { CartProvider } from './context/CartProvider'
import { FavoritesProvider } from './context/FavoritesProvider'
import { shelves } from './data/products'
import { Benefits } from './sections/Benefits'
import { Blog } from './sections/Blog'
import { CategoryBanners } from './sections/CategoryBanners'
import { Causes } from './sections/Causes'
import { ConsultantBanners } from './sections/ConsultantBanners'
import { HeroCarousel } from './sections/HeroCarousel'
import { Instagram } from './sections/Instagram'
import { LaunchBanners } from './sections/LaunchBanners'
import { LimitedOffers } from './sections/LimitedOffers'

export function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <a
          href="#conteudo"
          className="sr-only z-50 bg-brand px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Pular para o conteúdo
        </a>

        <AnnouncementBar />
        <Header />

        <main id="conteudo" tabIndex={-1} className="outline-none">
          <h1 className="sr-only">Amakha Paris: perfumes, cosméticos e bem-estar</h1>
          <HeroCarousel />
          <LimitedOffers />
          <Benefits />

          {/* Seções do meio: espaçamento vertical de 32px no Figma */}
          <div className="flex flex-col gap-8 pt-8">
            <ProductShelf {...shelves.favorites} />
            <LaunchBanners />
            <ProductShelf {...shelves.emotions} />
            <CategoryBanners />
            <ProductShelf {...shelves.routine} />
            <ConsultantBanners />
          </div>

          <Blog />
          <Causes />
          <Instagram />
        </main>

        <Footer />
        <MiniCart />
        <WhatsAppButton />
      </FavoritesProvider>
    </CartProvider>
  )
}
