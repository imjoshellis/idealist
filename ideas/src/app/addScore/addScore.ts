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
    findOne: ({ id }: { id: string }) => any
    update: (obj: any) => any
  }
}) => {
  return async ({ id, type, userId }: AddScoreProps) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    let makeScoreProps: MakeScoreProps = {}
    for (const scoreType of Object.values(ScoreNames)) {
      if (type === scoreType) {
        makeScoreProps[scoreType] = [
          ...ideaFromDb.score[scoreType].userIds,
          userId
        ]
      } else {
        makeScoreProps[scoreType] = [...ideaFromDb.score[scoreType].userIds]
      }
    }
    const score = makeScore(makeScoreProps)

    const idea = makeIdea({
      text: ideaFromDb.text,
      id: ideaFromDb.id,
      userId: ideaFromDb.userId,
      score
    })

    const { STARS, LIKES, REJECTS } = ScoreNames
    return ideaDb.update({
      id,
      score: {
        stars: {
          userIds: idea.score().getUserIds(STARS),
          value: idea.score().getValue(STARS)
        },
        likes: {
          userIds: idea.score().getUserIds(LIKES),
          value: idea.score().getValue(LIKES)
        },
        rejects: {
          userIds: idea.score().getUserIds(REJECTS),
          value: idea.score().getValue(REJECTS)
        }
      }
    })
  }
}
