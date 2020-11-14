import IdeaSubmission from '../components/IdeaSubmission'
import Link from 'next/link'
import Container from '../components/Container'

const Home = () => {
  return (
    <Container>
      <div className='flex flex-row w-full'>
        <div className='flex-grow mr-4'>
          <IdeaSubmission />
        </div>
        <Link href='/list'>
          <a className='text-link-100 px-8 py-4 rounded uppercase font-bold bg-link-500'>
            done →
          </a>
        </Link>
      </div>
    </Container>
  )
}

export default Home
