import * as React from 'react'
import { render, screen } from '../../test/test-utils'
import IdeaCounter from '../../components/IdeaCounter'
import faker from 'faker'

describe('IdeaCounter', () => {
  it('Shows a dynamic count of ideas', () => {
    let ideas = [] as string[]
    for (let i = 0; i < 3; i++) {
      ideas.push(faker.lorem.sentence())
    }
    render(<IdeaCounter />, { ideas })
    expect(screen.getByTestId('idea-counter').innerHTML).toContain('3')
  })

  it('Shows a prompt if ideas is empty', () => {
    render(<IdeaCounter />)
    expect(screen.getByTestId('idea-counter').innerHTML).toContain(
      'Add an idea to get started'
    )
  })

  it('Accepts a goal prop', () => {
    let ideas = [] as string[]
    for (let i = 0; i < 3; i++) {
      ideas.push(faker.lorem.sentence())
    }
    render(<IdeaCounter goal={20} />, { ideas })
    expect(screen.getByTestId('idea-counter').innerHTML).toContain('20')
  })
})
