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

  function servicesDropdown() {
    return screen.getByRole('link', { name: 'Profissionais Liberais' }).closest('.header__dropdown')
  }

  it('keeps the Serviços dropdown closed by default', () => {
    renderHeader()
    expect(servicesDropdown()).not.toHaveClass('header__dropdown--open')
  })

  it('opens the Serviços dropdown when its toggle is clicked', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: /mostrar submenu de serviços/i }))

    expect(servicesDropdown()).toHaveClass('header__dropdown--open')
  })

  it('closes the Serviços dropdown when its toggle is clicked again', async () => {
    const user = userEvent.setup()
    renderHeader()
    const toggle = screen.getByRole('button', { name: /mostrar submenu de serviços/i })

    await user.click(toggle)
    await user.click(toggle)

    expect(servicesDropdown()).not.toHaveClass('header__dropdown--open')
  })
})
