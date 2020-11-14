import IdeaSubmission from '../components/IdeaSubmission'
import Link from 'next/link'
import Container from '../components/Container'
import IdeaCounter from '../components/IdeaCounter'

const Home = () => {
  return (
    <Container>
      <div className='flex flex-col w-full items-center'>
        <div className='text-lg mb-4'>
          <IdeaCounter />
        </div>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='flex-grow md:mr-4'>
            <IdeaSubmission />
          </div>
          <Link href='/list'>
            <a className='text-link-100 mt-4 text-center md:mt-0 px-8 py-4 rounded uppercase font-bold bg-link-500'>
              done&nbsp;→
            </a>
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default Home
