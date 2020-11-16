import { MakeScoreProps, Score, ScoreNames } from './ScoreTypes'

interface BuildMakeIdeaProps {
  sanitize: (text: string) => string
  makeScore: (
    props?: MakeScoreProps
  ) => Readonly<{
    getUserIds: (type: ScoreNames) => string[]
    getScore: (type: ScoreNames) => number
  }>
  Id: {
    makeId: () => string
    isValid: (id: string) => boolean
  }
}

interface MakeIdeaProps {
  text: string
  id?: string
  userId: string
  score?: Score
}

export { BuildMakeIdeaProps, MakeIdeaProps }
