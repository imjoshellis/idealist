import { NextPage } from 'next'
import React from 'react'
import Container from '../components/Container'
import IdeaList from '../components/IdeaList'
import Link from 'next/link'

export const List: NextPage = () => {
  return (
    <Container maxWidth='sm'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-2xl'>Ideas</h1>
        <IdeaList />
        <Link href='/'>
          <a className='text-link-100 text-center w-full px-8 py-4 mt-2 rounded uppercase font-bold bg-link-500'>
            add more
          </a>
        </Link>
      </div>
    </Container>
  )
}

export default List
