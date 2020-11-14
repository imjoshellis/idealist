import { render, screen } from '@testing-library/react'
import * as React from 'react'
import IdeaForm from '../components/IdeaForm'

describe('Idea Form', () => {
  it('has an idea input with proper label', () => {
    render(<IdeaForm />)
    expect(screen.getByRole('textbox', { name: /idea/i })).toBeInTheDocument()
  })

  it('visually hides the idea input label', () => {
    render(<IdeaForm />)
    expect(screen.getByText(/idea/i)).toHaveClass('visuallyhidden')
  })
})
