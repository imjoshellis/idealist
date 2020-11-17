import { makeScore } from '../core/entities'
import { MakeScoreProps, ScoreKeys } from '../core/types'
import { InsertedIdea } from '../createIdea/createIdea'

interface RemoveScoreProps {
  id: string
  userId: string
  type: ScoreKeys
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

    const makeScoreProps: MakeScoreProps = {}
    for (const [key, value] of Object.entries(ideaFromDb.score)) {
      makeScoreProps[key as ScoreKeys] =
        key === type
          ? value.userIds.filter(u => u !== userId)
          : [...value.userIds]
    }

    const score = makeScore(makeScoreProps)

    return ideaDb.update({ id, score })
  }
}
