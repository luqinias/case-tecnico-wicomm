import { Carousel } from '../components/ui/Carousel'
import { heroSlides, type HeroSlide } from '../data/hero'
import { srcSet } from '../lib/image'

function Slide({ slide, index }: { slide: HeroSlide; index: number }) {
  if (slide.kind === 'image') {
    return (
      <a href={slide.href} className="block">
        <img
          src={slide.image.src}
          srcSet={srcSet(slide.image)}
          sizes="100vw"
          width={slide.image.width}
          height={slide.image.height}
          alt={slide.alt}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className="aspect-[1280/372] w-full object-cover"
        />
      </a>
    )
  }

  return (
    <a
      href={slide.href}
      className="grid aspect-[1280/372] w-full grid-cols-[61%_39%] overflow-hidden bg-white"
    >
      <span className="grid place-items-center">
        <img
          src={slide.image.src}
          srcSet={srcSet(slide.image)}
          sizes="(min-width: 1200px) 270px, 22vw"
          width={slide.image.width}
          height={slide.image.height}
          alt={slide.imageAlt}
          loading="lazy"
          className="h-[85%] w-auto object-contain"
        />
      </span>
      <span className="flex flex-col items-center justify-center bg-[#a85d6b] px-2 text-center font-bold text-white uppercase">
        <span className="text-[2.2vw] leading-tight xl:text-[28px]">{slide.kicker}</span>
        <span className="text-[5.5vw] leading-none xl:text-[70px]">{slide.title}</span>
        <span className="text-[2.2vw] leading-tight xl:text-[28px]">{slide.subtitle}</span>
        <span className="mt-[2vw] rounded-full bg-white px-[1.5vw] py-[0.5vw] text-[1.8vw] text-[#a85d6b] xl:mt-6 xl:px-5 xl:py-1.5 xl:text-xl">
          Saiba mais ›
        </span>
      </span>
    </a>
  )
}

export function HeroCarousel() {
  return (
    <section aria-label="Destaques">
      <Carousel
        label="Banners de destaque"
        items={heroSlides}
        getKey={(slide) => slide.id}
        renderItem={(slide, index) => <Slide slide={slide} index={index} />}
        itemClassName="w-full"
        arrowsClassName="container-page inset-x-0 top-1/2 -translate-y-1/2 xl:top-[158px] xl:translate-y-0 max-sm:hidden"
        dotsTone="light"
        dotsClassName="absolute inset-x-0 bottom-0 sm:bottom-[15px]"
      />
    </section>
  )
}
