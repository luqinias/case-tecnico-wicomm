import { Carousel } from '../components/ui/Carousel'
import { instagram } from '../data/content'
import { srcSet } from '../lib/image'

export function Instagram() {
  return (
    <section aria-labelledby="instagram-titulo" className="container-page py-8">
      <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center">
        <div className="flex shrink-0 items-center rounded bg-white p-6 shadow-panel md:h-[249px] md:w-[248px] md:px-[33px]">
          <h2 id="instagram-titulo" className="text-xl leading-[1.3] font-light">
            Fique por dentro das nossas redes sociais{' '}
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink-soft"
            >
              {instagram.handle}
              <span className="sr-only"> (abre o Instagram em nova aba)</span>
            </a>
          </h2>
        </div>

        <div className="min-w-0 flex-1">
          <Carousel
            label="Posts do Instagram"
            variant="inline"
            showDots={false}
            items={instagram.posts}
            getKey={(post) => post.id}
            trackClassName="gap-5"
            itemClassName="w-[70%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
            renderItem={(post) => (
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded"
              >
                <img
                  src={post.image.src}
                  srcSet={srcSet(post.image)}
                  sizes="(min-width: 1024px) 249px, (min-width: 640px) 45vw, 70vw"
                  width={post.image.width}
                  height={post.image.height}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            )}
          />
        </div>
      </div>
    </section>
  )
}
