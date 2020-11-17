import { makeScore } from '../core/entities'
import { ScoreNames } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'

interface RemoveScoreProps {
  id: string
  userId: string
  type: ScoreNames
}

export const makeRemoveScore = ({
  ideaDb
}: {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}) => {
  return async ({ id, userId, type }: RemoveScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const scores = ideaFromDb.scores.map(s =>
      s.type === type
        ? makeScore({ type, userIds: s.userIds.filter(u => u !== userId) })
        : s
    )

    return ideaDb.update({ id, scores })
  }
}
