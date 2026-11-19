import { SectionTitle } from '../components/ui/SectionTitle'
import { blogPosts } from '../data/content'
import { srcSet } from '../lib/image'

export function Blog() {
  return (
    <section aria-labelledby="blog-titulo" className="container-page py-8">
      <SectionTitle id="blog-titulo" className="mb-5">
        Nosso Blog
      </SectionTitle>
      <ul className="grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <li key={post.id}>
            <article className="group relative flex h-full flex-col md:min-h-[450px]">
              <img
                src={post.image.src}
                srcSet={srcSet(post.image)}
                sizes="(min-width: 1200px) 376px, (min-width: 768px) 33vw, 100vw"
                width={post.image.width}
                height={post.image.height}
                alt={post.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[376/170] w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-4 bg-white px-4 py-10 shadow-blog">
                <h3 className="text-lg leading-[1.3] font-medium md:text-xl">{post.title}</h3>
                <p className="text-sm leading-[1.3]">{post.excerpt}</p>
                {/* Link esticado: o card inteiro é clicável, mas só "Leia mais" é lido */}
                <a
                  href={post.href}
                  className="text-sm leading-[1.3] font-medium after:absolute after:inset-0 group-hover:underline"
                >
                  LEIA MAIS<span className="sr-only">: {post.title}</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
