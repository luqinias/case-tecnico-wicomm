const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

/** Formata centavos em reais: 25500 → "R$ 255,00". */
export function formatBRL(cents: number) {
  return brl.format(cents / 100).replace(/ /g, ' ')
}

/** Formato curto do layout, sem centavos quando inteiro: 25500 → "R$ 255". */
export function formatBRLShort(cents: number) {
  return cents % 100 === 0 ? `R$ ${cents / 100}` : formatBRL(cents)
}
