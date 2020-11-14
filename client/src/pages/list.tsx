import { NextPage } from 'next'
import React from 'react'
import Container from '../components/Container'
import IdeaList from '../components/IdeaList'

export const List: NextPage = () => {
  return (
    <Container maxWidth='sm'>
      <h1 className='font-bold text-2xl'>Ideas</h1>
      <IdeaList />
    </Container>
  )
}

export default List
