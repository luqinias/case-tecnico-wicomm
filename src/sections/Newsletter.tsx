import { useId, useState, type FormEvent } from 'react'
import { validateNewsletter, type NewsletterErrors as Errors } from '../lib/validation'

const field =
  'h-10 w-full rounded bg-white px-4 font-inter text-sm text-ink placeholder:font-light placeholder:text-placeholder aria-invalid:outline-2 aria-invalid:outline-[#ff8a8a]'

export function Newsletter() {
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState('')
  const nameId = useId()
  const emailId = useId()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const nextErrors = validateNewsletter(name, String(data.get('email') ?? ''))
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      setSuccess('')
      const firstInvalid = nextErrors.name ? 'name' : 'email'
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    setSuccess(`Obrigado, ${name.trim().split(' ')[0]}! Você vai receber nossas novidades.`)
    form.reset()
  }

  return (
    <section
      aria-labelledby="newsletter-titulo"
      className="relative overflow-hidden bg-linear-to-r from-[#050505] to-[#6b6b6b] px-5 py-8 text-white md:px-14"
    >
      {/* Faixa diagonal decorativa do layout */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden drop-shadow-[-4px_0_8px_rgb(0_0_0/0.55)] md:block"
      >
        <div className="size-full bg-linear-to-r from-[#969696] to-[#bdbdbd] [clip-path:polygon(73.5%_0,100%_0,100%_100%,71.4%_100%)]" />
      </div>

      <div className="relative flex flex-col gap-2">
        <h2 id="newsletter-titulo" className="text-xl leading-[1.3] font-bold md:text-[26px]">
          Aceita receber nossas ofertas e conteúdos exclusivos?
        </h2>
        <p className="text-sm leading-[1.3] md:text-base">
          Saiba também das promoções em primeira mão
        </p>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-2 sm:flex-row sm:items-start"
        >
          <div className="sm:w-[141px]">
            <label htmlFor={nameId} className="sr-only">
              Nome
            </label>
            <input
              id={nameId}
              name="name"
              autoComplete="name"
              placeholder="Nome"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${nameId}-erro` : undefined}
              className={field}
            />
            {errors.name && (
              <p id={`${nameId}-erro`} className="mt-1 text-xs text-[#ffb4b4]">
                {errors.name}
              </p>
            )}
          </div>
          <div className="sm:w-[293px]">
            <label htmlFor={emailId} className="sr-only">
              E-mail
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${emailId}-erro` : undefined}
              className={field}
            />
            {errors.email && (
              <p id={`${emailId}-erro`} className="mt-1 text-xs text-[#ffb4b4]">
                {errors.email}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="h-10 cursor-pointer rounded bg-brand font-inter text-lg font-semibold text-ink transition hover:brightness-95 sm:w-[178px]"
          >
            CADASTRAR
          </button>
        </form>
        <output className="absolute -bottom-6 left-0 text-sm text-brand">{success}</output>
      </div>
    </section>
  )
}
