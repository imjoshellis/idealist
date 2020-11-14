import React from 'react'
import Home from '../../pages/index'
import { render, screen } from '@testing-library/react'

const renderHome = () => render(<Home />)

describe('Home page', () => {
  it('renders <IdeaSubmission />', () => {
    renderHome()
    expect(screen.getByTestId('idea-form')).toBeInTheDocument()
  })

  it('has a done button', () => {
    renderHome()
    expect(screen.getByRole('button', { name: /done/i }))
  })
})
