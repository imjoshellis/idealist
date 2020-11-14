import IdeaSubmission from '../components/IdeaSubmission'
import { IdeaProvider } from '../providers/IdeaProvider'
import Link from 'next/link'

const Home = () => {
  return (
    <IdeaProvider>
      <IdeaSubmission />
      <Link href='/list'>
        <a>done</a>
      </Link>
    </IdeaProvider>
  )
}

export default Home
