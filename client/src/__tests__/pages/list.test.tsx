import React from 'react'
import List from '../../pages/list'
import { render, screen } from '../../test/test-utils'

const renderList = () => render(<List />)

describe('Home page', () => {
  it('renders <IdeaList />', () => {
    renderList()
    expect(screen.getByTestId('idea-list')).toBeInTheDocument()
  })
})
