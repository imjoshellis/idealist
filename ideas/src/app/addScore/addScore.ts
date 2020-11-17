import { makeScore } from '../core/entities'
import { ScoreKeys } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'
import { buildMakeScoreProps } from '../useCaseUtils'

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
  return async ({ id, key, userId }: AddScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const fn = (a: string[]) => [...a, userId]
    const score = makeScore(buildMakeScoreProps(fn, ideaFromDb.score, key))

    return ideaDb.update({ id, score })
  }
}
