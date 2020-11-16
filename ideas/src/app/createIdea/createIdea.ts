import { makeIdea } from '../core/entities'
import { MakeIdeaProps, ScoreNames } from '../core/types'
export const makeCreateIdea = ({
  ideaDb
}: {
  ideaDb: { insert: (obj: any) => any }
}) => {
  return async (ideaProps: MakeIdeaProps) => {
    const idea = makeIdea({ ...ideaProps })
    return ideaDb.insert({
      id: idea.getId(),
      text: idea.getText(),
      userId: idea.getUserId(),
      userStars: idea.score().getUserIds(ScoreNames.STARS),
      starScore: idea.score().getScore(ScoreNames.STARS),
      userLikes: idea.score().getUserIds(ScoreNames.LIKES),
      likeScore: idea.score().getScore(ScoreNames.LIKES),
      userRejects: idea.score().getUserIds(ScoreNames.REJECTS),
      rejectScore: idea.score().getScore(ScoreNames.REJECTS)
    })
  }
}
