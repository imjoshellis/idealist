import * as React from 'react'
import { render, screen } from '@testing-library/react'
import IdeaSubmission from '../components/IdeaSubmission'

describe('Idea Submission', () => {
  it('contains IdeaForm', () => {
    const { container } = render(<IdeaSubmission />)
    expect(container.firstChild?.nodeName.toLowerCase()).toBe('form')
    expect(screen.getByRole('textbox', { name: /idea/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /add/i
      })
    ).toBeInTheDocument()
  })
})
