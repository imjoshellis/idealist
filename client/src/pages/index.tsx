import IdeaSubmission from '../components/IdeaSubmission'
import { IdeaProvider } from '../providers/IdeaProvider'

const Home = () => {
  return (
    <IdeaProvider>
      <IdeaSubmission />
    </IdeaProvider>
  )
}

export default Home
