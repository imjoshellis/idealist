import { makeIdea, makeScore } from '../core'
import { MakeAddScore } from './addScore.types'

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
