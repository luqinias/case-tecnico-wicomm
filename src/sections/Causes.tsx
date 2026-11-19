import { SectionTitle } from '../components/ui/SectionTitle'
import { causes } from '../data/content'
import { srcSet } from '../lib/image'

export function Causes() {
  return (
    <section aria-labelledby="causas-titulo" className="bg-surface-muted">
      <div className="container-page py-8">
        <SectionTitle id="causas-titulo" className="mb-5">
          Nossas Causas
        </SectionTitle>
        <ul className="grid gap-5 md:grid-cols-3">
          {causes.map((cause) => (
            <li
              key={cause.id}
              className="flex flex-col items-center gap-2 rounded-lg border-[0.5px] border-line-soft px-5 py-8 text-center md:min-h-[321px] md:justify-center"
            >
              <img
                src={cause.image.src}
                srcSet={srcSet(cause.image)}
                sizes="130px"
                width={cause.image.width}
                height={cause.image.height}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[143px] w-[130px] object-contain"
              />
              <h3 className="text-sm leading-[1.3] font-medium">{cause.title}</h3>
              <p className="max-w-[208px] text-xs leading-[1.3] font-light">{cause.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
