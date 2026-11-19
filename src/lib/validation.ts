export type NewsletterErrors = { name?: string; email?: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Valida o formulário da newsletter; retorna as mensagens por campo. */
export function validateNewsletter(name: string, email: string): NewsletterErrors {
  const errors: NewsletterErrors = {}
  if (name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Informe um e-mail válido.'
  return errors
}
