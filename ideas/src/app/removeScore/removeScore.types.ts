import { Idea, ScoreNames } from '../core'
import { InsertedIdea } from '../useCase.types'

interface RemoveScoreProps {
  id: string
  userId: string
  type: ScoreNames
}
type RemoveScore = (props: RemoveScoreProps) => Promise<Idea>

interface MakeRemoveScoreProps {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}
export type MakeRemoveScore = (props: MakeRemoveScoreProps) => RemoveScore
