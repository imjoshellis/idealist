import { render } from '@testing-library/react'
import * as React from 'react'
import IdeaForm from '../components/IdeaForm'

describe('Idea Form', () => {
  it('does nothing', () => {
    const { container } = render(<IdeaForm />)
    expect(container).toBeTruthy()
  })
})
