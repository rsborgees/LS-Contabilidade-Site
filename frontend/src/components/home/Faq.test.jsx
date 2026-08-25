import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Faq } from './Faq'
import { FAQ_ITEMS } from '../../data/faq'

describe('Faq', () => {
  it('keeps every answer collapsed initially', () => {
    render(<Faq />)
    expect(screen.queryByText(FAQ_ITEMS[0].answer)).not.toBeInTheDocument()
  })

  it('reveals the answer when its question is clicked', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    await user.click(screen.getByRole('button', { name: new RegExp(FAQ_ITEMS[0].question) }))

    expect(screen.getByText(FAQ_ITEMS[0].answer)).toBeInTheDocument()
  })

  it('collapses an open answer when its question is clicked again', async () => {
    const user = userEvent.setup()
    render(<Faq />)
    const questionButton = screen.getByRole('button', { name: new RegExp(FAQ_ITEMS[0].question) })

    await user.click(questionButton)
    await user.click(questionButton)

    expect(screen.queryByText(FAQ_ITEMS[0].answer)).not.toBeInTheDocument()
  })

  it('only keeps one answer open at a time', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    await user.click(screen.getByRole('button', { name: new RegExp(FAQ_ITEMS[0].question) }))
    await user.click(screen.getByRole('button', { name: new RegExp(FAQ_ITEMS[1].question) }))

    expect(screen.queryByText(FAQ_ITEMS[0].answer)).not.toBeInTheDocument()
    expect(screen.getByText(FAQ_ITEMS[1].answer)).toBeInTheDocument()
  })
})
