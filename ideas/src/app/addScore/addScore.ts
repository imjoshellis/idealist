import { makeScore } from '../core/entities'
import { MakeScoreProps, ScoreKeys } from '../core/types'
import { InsertedIdea } from './../createIdea/createIdea'

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

    const makeScoreProps: MakeScoreProps = {}
    for (const [k, v] of Object.entries(ideaFromDb.score)) {
      makeScoreProps[k as ScoreKeys] =
        k === key ? [...v.userIds, userId] : [...v.userIds]
    }

    const score = makeScore(makeScoreProps)

    return ideaDb.update({ id, score })
  }
}
