import { makeIdea } from '../core/entities'
import { MakeIdeaProps, ScoreNames } from '../core/types'

type InsertedScore = {
  [type in ScoreNames]: {
    userIds: string[]
    value: number
  }
}

export interface InsertedIdea {
  id: string
  text: string
  userId: string
  score: InsertedScore
}

export const makeCreateIdea = ({
  ideaDb
}: {
  ideaDb: { insert: (obj: any) => any }
}) => {
  return async (ideaProps: MakeIdeaProps) => {
    const idea = makeIdea({ ...ideaProps })

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

    return ideaDb.insert({
      id: idea.getId(),
      text: idea.getText(),
      userId: idea.getUserId(),
      score
    })
  }
}
