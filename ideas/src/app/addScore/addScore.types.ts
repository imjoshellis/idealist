import { Idea, ScoreNames } from '../core'
import { InsertedIdea } from '../useCase.types'

interface AddScoreProps {
  id: string
  userId: string
  type: ScoreNames
}
type AddScore = (props: AddScoreProps) => Promise<Idea>

interface MakeAddScoreProps {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}
export type MakeAddScore = (props: MakeAddScoreProps) => AddScore
