import { makeIdea } from '../core/entities'
import { MakeIdeaProps, ScoreNames } from '../core/types'
export const makeCreateIdea = ({
  ideaDb
}: {
  ideaDb: { insert: (obj: any) => any }
}) => {
  return async (ideaProps: MakeIdeaProps) => {
    const idea = makeIdea({ ...ideaProps })
    const { STARS, LIKES, REJECTS } = ScoreNames
    return ideaDb.insert({
      id: idea.getId(),
      text: idea.getText(),
      userId: idea.getUserId(),
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
