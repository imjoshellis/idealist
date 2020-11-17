import { Score } from './ScoreTypes'

type Idea = Readonly<{
  text: string
  id: string
  userId: string
  scores: Score[]
}>

type PartialIdea = Readonly<{
  text: string
  id?: string
  userId: string
  scores?: Score[]
}>

type MaybeIdea = Idea | PartialIdea

type MakeIdea = (props: MaybeIdea) => Idea

interface BuildMakeIdeaProps {
  sanitize: (text: string) => string
  makeScores: () => Score[]
  Id: {
    makeId: () => string
    isValid: (id: string) => boolean
  }
}

export { Idea, MakeIdea, BuildMakeIdeaProps, PartialIdea, MaybeIdea }
