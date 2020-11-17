import { GetScoreByType } from './../entities/score'
import { Score } from './ScoreTypes'

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
