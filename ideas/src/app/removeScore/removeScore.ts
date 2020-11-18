// @ts-nocheck
import { makeIdea, makeScore, Score } from '../core'
import { MakeRemoveScore } from './removeScore.types'

export const makeRemoveScore: MakeRemoveScore = ({ ideaDb }) => {
  return async ({ id, userId, type }) => {
    const ideaFromDb = await ideaDb.findOne({ id })
    if (!ideaFromDb) throw new Error('Idea not found')

    const newScore = (s: Score) =>
      makeScore({
        type,
        userIds: s?.userIds.filter(u => u !== userId)
      })

    const scores = pipe(
      ideaFromDb.scores,
      O.fromNullable,
      O.bindTo('scores'),
      O.bind('index', ({ scores }) =>
        A.findIndex((s: Score) => s.type === type)(scores)
      ),
      O.map(({ scores, index }) => A.modifyAt(index, newScore)(scores))
    )

    if (O.isNone(scores)) throw Error
    if (O.isNone(scores.value)) throw Error

    const idea = makeIdea({ ...ideaFromDb, scores: scores.value.value })
    await ideaDb.update({ id, scores: idea.scores })

    return idea
  }
}
