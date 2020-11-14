import React from 'react'
import Home from '../../pages/index'
import { render, screen } from '@testing-library/react'

const renderHome = () => render(<Home />)

describe('Home page', () => {
  it('renders <IdeaSubmission />', () => {
    renderHome()
    expect(screen.getByTestId('idea-form')).toBeInTheDocument()
  })

})
