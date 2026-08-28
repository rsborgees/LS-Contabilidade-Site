import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ScrollToTop } from './ScrollToTop'

function TestApp() {
  return (
    <MemoryRouter initialEntries={['/pagina-a']}>
      <ScrollToTop />
      <Routes>
        <Route path="/pagina-a" element={<Link to="/pagina-b">Ir para B</Link>} />
        <Route path="/pagina-b" element={<p>Página B</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ScrollToTop', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('scrolls to the top when the route changes', async () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy
    const user = userEvent.setup()

    const { getByText } = render(<TestApp />)

    await user.click(getByText('Ir para B'))

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
  })
})
