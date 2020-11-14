import { build, fake } from '@jackfranklin/test-data-bot'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import IdeaForm from '../components/IdeaForm'

const buildIdea = build({
  fields: {
    idea: fake(f => f.lorem.sentence())
  }
})

describe('Idea Form', () => {
  it('is a form', () => {
    const handleSubmit = jest.fn()
    const { container } = render(<IdeaForm onSubmit={handleSubmit} />)
    expect(container.firstChild?.nodeName.toLowerCase()).toBe('form')
  })

  it('has an idea input with accessible label', () => {
    const handleSubmit = jest.fn()
    render(<IdeaForm onSubmit={handleSubmit} />)
    expect(screen.getByRole('textbox', { name: /idea/i })).toBeInTheDocument()
  })

  it('visually hides the idea input label', () => {
    const handleSubmit = jest.fn()
    render(<IdeaForm onSubmit={handleSubmit} />)
    expect(screen.getByText(/idea/i)).toHaveClass('visuallyhidden')
  })

  it('has a submit button', () => {
    const handleSubmit = jest.fn()
    render(<IdeaForm onSubmit={handleSubmit} />)
    expect(
      screen.getByRole('button', {
        name: /add/i
      })
    ).toBeInTheDocument()
  })

  it('calls onSubmit when submitted', () => {
    const handleSubmit = jest.fn()
    render(<IdeaForm onSubmit={handleSubmit} />)
    userEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('handles onSubmit with an idea', () => {
    const handleSubmit = jest.fn()
    render(<IdeaForm onSubmit={handleSubmit} />)
    const { idea } = buildIdea()
    userEvent.type(screen.getByLabelText(/idea/i), idea as string)
    userEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      idea
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('resets the form when submitted', () => {
    const handleSubmit = jest.fn()
    render(<IdeaForm onSubmit={handleSubmit} />)
    const { idea } = buildIdea()
    userEvent.type(screen.getByLabelText(/idea/i), idea as string)
    userEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(screen.getByLabelText(/idea/i)).toHaveValue('')
  })
})
