import React from 'react'
import { render, screen } from '@testing-library/react'
import Container from '../../components/Container'
import faker from 'faker'

describe('Container', () => {
  it('renders children', () => {
    const text = faker.lorem.sentence()
    render(
      <Container>
        <span>{text}</span>
      </Container>
    )
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
