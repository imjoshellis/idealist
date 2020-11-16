import { makeIdea, MakeIdeaProps, ScoreTypes } from './../idea'
export const makeAddIdea = ({
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
      starCount: idea.countScore({ type: ScoreTypes.STAR }),
      likeCount: idea.countScore({ type: ScoreTypes.LIKE }),
      rejectCount: idea.countScore({ type: ScoreTypes.REJECT })
    })
  }
}
