import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('starts with the mobile menu closed', () => {
    renderHeader()
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('header__nav--open')
  })

  it('opens the mobile menu when the toggle button is clicked', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: /abrir menu/i }))

    expect(screen.getByRole('navigation')).toHaveClass('header__nav--open')
  })

  it('closes the mobile menu after a nav link is clicked', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: /abrir menu/i }))
    await user.click(screen.getByRole('link', { name: 'Sobre Nós' }))

    expect(screen.getByRole('navigation')).not.toHaveClass('header__nav--open')
  })
})
