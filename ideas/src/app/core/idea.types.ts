import { GetScoreByType, Score } from '.'

type Idea = Readonly<{
  text: string
  id: string
  userId: string
  scores: Score[]
  getScoreByType: GetScoreByType
}>

type PartialIdea = Readonly<{
  text: string
  id?: string
  userId: string
  scores?: Score[]
  getScoreByType?: GetScoreByType
}>

type MaybeIdea = Idea | PartialIdea

type MakeIdea = (props: MaybeIdea) => Idea

export { Idea, MakeIdea, PartialIdea, MaybeIdea }
