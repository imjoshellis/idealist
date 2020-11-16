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
    findOne: ({ id }: { id: string }) => InsertedIdea
    update: (obj: any) => InsertedIdea
  }
}) => {
  return async ({ id, type, userId }: AddScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })

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
        userIds: idea.score().getUserIds(type),
        value: idea.score().getValue(type)
      }
    }

    return ideaDb.update({ id, score })
  }
}
