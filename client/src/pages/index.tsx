import IdeaSubmission from '../components/IdeaSubmission'
import { IdeaProvider } from '../providers/IdeaProvider'

const Home = () => {
  return (
    <IdeaProvider>
      <IdeaSubmission />
      <button>done</button>
    </IdeaProvider>
  )
}

export default Home
