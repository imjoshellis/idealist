import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Container from '../components/Container'
import IdeaList from '../components/IdeaList'
import Link from 'next/link'
import SaveList from '../components/SaveList'
import { useIdeas } from '../providers/IdeaProvider'
import { useRouter } from 'next/router'

export const List: NextPage = () => {
  const [ideas] = useIdeas()
  const router = useRouter()
  useEffect(() => {
    if (ideas.length === 0) router.replace('/')
  }, [ideas])
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
        <SaveList />
      </div>
    </Container>
  )
}

export default List
