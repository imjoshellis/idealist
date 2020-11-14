import * as React from 'react'
import { render, screen } from '../../test/test-utils'
import IdeaSubmission from '../../components/IdeaSubmission'
import userEvent from '@testing-library/user-event'
import { useIdeas } from '../../providers/IdeaProvider'
import faker from 'faker'

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

  it('updates idea context', async () => {
    const Component = () => {
      const [ideas] = useIdeas()
      return (
        <>
          {ideas.map((idea, idx) => (
            <div key={idx}>{idea}</div>
          ))}
        </>
      )
    }
    render(
      <>
        <IdeaSubmission />
        <Component />
      </>
    )
    const idea1 = faker.lorem.sentence()
    const idea2 = faker.lorem.sentence()

    userEvent.type(screen.getByLabelText(/idea/i), idea1)
    userEvent.click(screen.getByRole('button', { name: /add/i }))

    userEvent.type(screen.getByLabelText(/idea/i), idea2)
    userEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(await screen.findByText(idea1)).toBeInTheDocument()
    expect(await screen.findByText(idea2)).toBeInTheDocument()
  })
})
