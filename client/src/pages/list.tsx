import { NextPage } from 'next'
import React from 'react'
import Container from '../components/Container'
import IdeaList from '../components/IdeaList'

export const List: NextPage = () => {
  return (
    <Container>
      <IdeaList />
    </Container>
  )
}

export default List
