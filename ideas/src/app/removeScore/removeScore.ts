import { makeScore } from '../core/entities'
import { ScoreKeys } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'
import { buildMakeScoreProps } from '../useCaseUtils'

interface RemoveScoreProps {
  id: string
  userId: string
  key: ScoreKeys
}

export const makeRemoveScore = ({
  ideaDb
}: {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}) => {
  return async ({ id, userId, key }: RemoveScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const fn = (a: string[]) => a.filter(u => u !== userId)
    const score = makeScore(buildMakeScoreProps(fn, ideaFromDb.score, key))

    return ideaDb.update({ id, score })
  }
}
