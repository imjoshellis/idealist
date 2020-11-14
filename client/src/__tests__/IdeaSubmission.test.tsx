import * as React from 'react'
import { render, screen } from '@testing-library/react'
import IdeaSubmission from '../components/IdeaSubmission'
import { ideaActionTypes, ideaReducer } from '../reducers/ideaReducer'
import userEvent from '@testing-library/user-event'

jest.mock('../reducers/ideaReducer')

describe('IdeaSubmission', () => {
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

  it('has a done button', () => {
    render(<IdeaSubmission />)
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument()
  })

  it('uses ideaReducer', () => {
    render(<IdeaSubmission />)
    const idea = 'idea'

    userEvent.type(screen.getByLabelText(/idea/i), idea)
    userEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(ideaReducer).toHaveBeenCalled()

    const action = {
      type: ideaActionTypes.ADD_IDEA,
      payload: idea
    }
    expect(ideaReducer).toHaveBeenCalledWith([], action)
  })

  it.todo('updates ideas context')
})
