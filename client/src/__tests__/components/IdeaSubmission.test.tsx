import * as React from 'react'
import { render, screen } from '../../test/test-utils'
import IdeaSubmission from '../../components/IdeaSubmission'
import userEvent from '@testing-library/user-event'
import { useIdeas } from '../../providers/IdeaProvider'
import faker from 'faker'

describe('IdeaSubmission', () => {
  it('contains IdeaForm', () => {
    render(<IdeaSubmission />)
    expect(screen.getByTestId('idea-form')).toBeInTheDocument()
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

  it('does not allow blank submissions', async () => {
    const Component = () => {
      const [ideas] = useIdeas()
      return <>{ideas.length}</>
    }
    render(
      <>
        <IdeaSubmission />
        <Component />
      </>
    )

    expect(await screen.findByText('0')).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/idea/i), '')
    userEvent.click(screen.getByRole('button', { name: /add/i }))

    expect(await screen.findByText('0')).toBeInTheDocument()
  })
})
