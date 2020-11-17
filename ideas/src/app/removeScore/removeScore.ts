import { MakeRemoveScore } from './removeScore.types'
import { makeIdea, makeScore } from '../core'

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
