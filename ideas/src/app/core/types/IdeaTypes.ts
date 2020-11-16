import { MakeScore, Score } from './ScoreTypes'

type Idea = Readonly<{
  getText: () => string
  getId: () => string
  getUserId: () => string
  score: () => Score
}>

interface MakeIdeaProps {
  text: string
  id?: string
  userId: string
  score?: Score
}

type MakeIdea = (props: MakeIdeaProps) => Idea

interface BuildMakeIdeaProps {
  sanitize: (text: string) => string
  makeScore: MakeScore
  Id: {
    makeId: () => string
    isValid: (id: string) => boolean
  }
}

export { Idea, MakeIdea, BuildMakeIdeaProps, MakeIdeaProps }
