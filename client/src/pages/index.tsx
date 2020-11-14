import IdeaSubmission from '../components/IdeaSubmission'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <IdeaSubmission />
      <Link href='/list'>
        <a>done</a>
      </Link>
    </>
  )
}

export default Home
