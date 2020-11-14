import * as React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '../../test/test-utils'
import SaveList from '../../components/SaveList'
import userEvent from '@testing-library/user-event'

const renderSaveList = () => render(<SaveList />)

describe('SaveList', () => {
  renderSaveList()
  it('has a save button', async () => {
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('clicking save turns it into download', async () => {
    renderSaveList()

    userEvent.click(screen.getByRole('button', { name: /save/i }))

    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument()
  })
})
