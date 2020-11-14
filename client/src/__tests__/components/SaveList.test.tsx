import userEvent from '@testing-library/user-event'
import * as React from 'react'
import SaveList from '../../components/SaveList'
import { render, screen } from '../../test/test-utils'

describe('SaveList', () => {
  it('renders a save link', () => {
    render(<SaveList />)
    expect(screen.getByText(/save/i)).toBeInTheDocument()
  })
})
