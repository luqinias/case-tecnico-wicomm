import { benefits } from '../data/content'

export function Benefits() {
  return (
    <section aria-label="Benefícios" className="bg-surface">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-5 py-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-5 lg:py-[45px]">
        {benefits.map((benefit) => (
          <li
            key={benefit.lines
              .flat()
              .map((part) => part.text)
              .join('')}
            className="flex items-center gap-3"
          >
            <span className="grid size-[33px] shrink-0 place-items-center rounded-full border-[1.15px] border-[#3f3f3f]">
              <img
                src={benefit.icon}
                alt=""
                width={22}
                height={22}
                className="max-h-[22px] w-auto"
              />
            </span>
            <p className="text-[13px] leading-[1.15] text-ink-benefit">
              {benefit.lines.map((line, index) => (
                <span key={index} className="block">
                  {line.map((part) =>
                    'strong' in part ? <strong key={part.text}>{part.text}</strong> : part.text,
                  )}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
