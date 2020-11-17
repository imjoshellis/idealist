import { makeIdea, makeScore } from '../core/entities'
import { Idea, ScoreNames } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'

interface RemoveScoreProps {
  id: string
  userId: string
  type: ScoreNames
}
type RemoveScore = (props: RemoveScoreProps) => Promise<Idea>

interface MakeRemoveScoreProps {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}
type MakeRemoveScore = (props: MakeRemoveScoreProps) => RemoveScore

export const makeRemoveScore: MakeRemoveScore = ({ ideaDb }) => {
  return async ({ id, userId, type }) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const scores = ideaFromDb.scores.map(s =>
      s.type === type
        ? makeScore({ type, userIds: s.userIds.filter(u => u !== userId) })
        : s
    )

    const idea = makeIdea({ ...ideaFromDb, scores })
    await ideaDb.update({ id, scores: idea.scores })

    return idea
  }
}
