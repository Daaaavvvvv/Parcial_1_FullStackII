import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import NoEncontrada from './NoEncontrada.jsx'

describe('Página no encontrada', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NoEncontrada />
      </MemoryRouter>
    )
  })

  it('muestra el título', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Página no encontrada',
      })
    ).toBeInTheDocument()
  })

  it('ofrece un enlace para volver al inicio', () => {
    expect(
      screen.getByRole('link', {
        name: 'Volver al inicio',
      })
    ).toHaveAttribute('href', '/')
  })
})