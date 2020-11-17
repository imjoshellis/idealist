import { makeIdea, makeScore } from '../core/entities'
import { Idea, ScoreNames } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'

interface AddScoreProps {
  id: string
  userId: string
  type: ScoreNames
}
type AddScore = (props: AddScoreProps) => Promise<Idea>

interface MakeAddScoreProps {
  ideaDb: {
    findOne: ({ id }: { id: string }) => Promise<InsertedIdea>
    update: (obj: any) => Promise<InsertedIdea>
  }
}
type MakeAddScore = (props: MakeAddScoreProps) => AddScore

export const makeAddScore: MakeAddScore = ({ ideaDb }) => {
  return async ({ id, userId, type }) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const scores = ideaFromDb.scores.map(s =>
      s.type === type ? makeScore({ type, userIds: [...s.userIds, userId] }) : s
    )

    const idea = makeIdea({ ...ideaFromDb, scores })
    await ideaDb.update({ id, scores: idea.scores })

    return idea
  }
}
