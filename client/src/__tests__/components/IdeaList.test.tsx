import * as React from 'react'
import { render, screen } from '../../test/test-utils'
import IdeaList from '../../components/IdeaList'
import faker from 'faker'

describe('IdeaList', () => {
  it('renders a list from context', async () => {
    let ideas = [] as string[]
    for (let i = 0; i < 3; i++) {
      ideas.push(faker.lorem.sentence())
    }
    render(<IdeaList />, { ideas })
    expect(screen.getByTestId('idea-list')).toBeInTheDocument()
    for (let idea of ideas) {
      expect(await screen.getByText(idea)).toBeInTheDocument()
    }
  })
})
