import { makeScore } from '../core/entities'
import { ScoreKeys } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'

interface AddScoreProps {
  id: string
  userId: string
  key: ScoreKeys
}

export const makeAddScore = ({
  ideaDb
}: {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}) => {
  return async ({ id, userId, key }: AddScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const userIds = [...ideaFromDb.score[key].userIds, userId]
    const newScore = { [key]: { userIds } }
    const score = makeScore({ ...ideaFromDb.score, ...newScore })

    return ideaDb.update({ id, score })
  }
}
