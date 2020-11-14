import IdeaSubmission from '../components/IdeaSubmission'
import Link from 'next/link'
import Container from '../components/Container'

const Home = () => {
  return (
    <Container>
      <IdeaSubmission />
      <Link href='/list'>
        <a>done</a>
      </Link>
    </Container>
  )
}

export default Home
