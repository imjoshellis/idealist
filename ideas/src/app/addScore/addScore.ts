import { InsertedIdea } from './../createIdea/createIdea'
import { makeIdea, makeScore } from '../core/entities'
import { MakeScoreProps, ScoreNames } from '../core/types'

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
  return async ({ id, type, userId }: AddScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const makeScoreProps: MakeScoreProps = {}
    for (const [key, value] of Object.entries(ideaFromDb.score)) {
      makeScoreProps[key as ScoreNames] =
        key === type ? [...value.userIds, userId] : [...value.userIds]
    }

    const scoreEntity = makeScore(makeScoreProps)

    const idea = makeIdea({
      text: ideaFromDb.text,
      id: ideaFromDb.id,
      userId: ideaFromDb.userId,
      score: scoreEntity
    })

    const score: {
      [key: string]: {
        userIds: string[]
        value: number
      }
    } = {}

    for (const type of Object.values(ScoreNames)) {
      score[type] = {
        userIds: idea.score[type].userIds,
        value: idea.score[type].value
      }
    }

    return ideaDb.update({ id, score })
  }
}
