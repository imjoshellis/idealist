import React from 'react'
import List from '../../pages/list'
import { render, screen } from '../../test/test-utils'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn()
}))

const renderList = () => render(<List />, { ideas: ['idea'] })

describe('Home page', () => {
  it('renders <IdeaList />', () => {
    renderList()
    expect(screen.getByTestId('idea-list')).toBeInTheDocument()
  })

  it('renders <SaveList />', () => {
    renderList()
    expect(screen.getByTestId('save-list')).toBeInTheDocument()
  })

  it('has an add more link that goes home', () => {
    renderList()
    expect(screen.getByRole('link', { name: /add more/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /add more/i })).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('redirects home if list is empty', () => {
    const mockRouter = {
      replace: jest.fn() // the component uses `router.push` only
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<List />, { ideas: [] })
    expect(mockRouter.replace).toHaveBeenCalledWith('/')
  })
})
