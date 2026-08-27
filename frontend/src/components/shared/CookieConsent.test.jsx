import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CookieConsent } from './CookieConsent'

function renderConsent() {
  return render(
    <MemoryRouter>
      <CookieConsent />
    </MemoryRouter>,
  )
}

describe('CookieConsent', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('shows the banner when there is no stored consent', () => {
    renderConsent()
    expect(screen.getByText(/utilizamos cookies/i)).toBeInTheDocument()
  })

  it('hides the banner and stores consent after accepting', async () => {
    const user = userEvent.setup()
    renderConsent()

    await user.click(screen.getByRole('button', { name: /aceitar/i }))

    expect(screen.queryByText(/utilizamos cookies/i)).not.toBeInTheDocument()
    expect(window.localStorage.getItem('ls-cookie-consent')).toBe('accepted')
  })

  it('does not show the banner when consent was already given', () => {
    window.localStorage.setItem('ls-cookie-consent', 'accepted')
    renderConsent()

    expect(screen.queryByText(/utilizamos cookies/i)).not.toBeInTheDocument()
  })

  it('links to the privacy policy page', () => {
    renderConsent()
    expect(screen.getByRole('link', { name: /pol[ií]tica de privacidade/i })).toHaveAttribute(
      'href',
      '/politica-de-privacidade',
    )
  })
})
