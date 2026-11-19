import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { validateNewsletter } from '../../lib/validation'
import { Newsletter } from '../Newsletter'

describe('validateNewsletter', () => {
  it('exige nome e e-mail válidos', () => {
    expect(validateNewsletter('', 'x')).toEqual({
      name: 'Informe seu nome.',
      email: 'Informe um e-mail válido.',
    })
    expect(validateNewsletter('Ana', 'ana@email.com')).toEqual({})
  })
})

describe('Newsletter', () => {
  it('mostra erros e foca o primeiro campo inválido', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)
    await user.click(screen.getByRole('button', { name: 'CADASTRAR' }))

    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveAccessibleDescription(
      'Informe seu nome.',
    )
    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveFocus()
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toBeInvalid()
  })

  it('confirma o cadastro e limpa o formulário', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)
    await user.type(screen.getByRole('textbox', { name: 'Nome' }), 'Ana Souza')
    await user.type(screen.getByRole('textbox', { name: 'E-mail' }), 'ana@email.com')
    await user.click(screen.getByRole('button', { name: 'CADASTRAR' }))

    expect(screen.getByRole('status')).toHaveTextContent('Obrigado, Ana!')
    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveValue('')
  })
})
