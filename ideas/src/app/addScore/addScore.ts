import { makeScore } from '../core/entities'
import { ScoreNames } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'

interface AddScoreProps {
  id: string
  userId: string
  type: ScoreNames
}

export const makeAddScore = ({
  ideaDb
}: {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}) => {
  return async ({ id, userId, type }: AddScoreProps): Promise<InsertedIdea> => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const scores = ideaFromDb.scores.map(s =>
      s.type === type ? makeScore({ type, userIds: [...s.userIds, userId] }) : s
    )

    return ideaDb.update({ id, scores })
  }
}
