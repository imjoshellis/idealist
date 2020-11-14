import * as React from 'react'
import { render, screen } from '../../test/test-utils'
import IdeaCounter from '../../components/IdeaCounter'
import faker from 'faker'

describe('IdeaList', () => {
  it('renders a list from context', () => {
    let ideas = [] as string[]
    for (let i = 0; i < 3; i++) {
      ideas.push(faker.lorem.sentence())
    }
    render(<IdeaCounter />, { ideas })
    expect(screen.getByTestId('idea-counter').innerHTML).toBe('3')
  })
})
