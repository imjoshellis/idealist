import {
  MakeScore,
  MakeScoreProps,
  PartialScore,
  Score,
  ScoreKey
} from '../types/ScoreTypes'

const transformScores = (
  keys: ScoreKey[],
  props: MakeScoreProps,
  acc: PartialScore = {}
): Score => {
  if (keys.length === 0) return acc as Score
  const type = keys[0]
  const userIds = [...new Set(props[type])]
  const value = userIds.length
  const remainingKeys = keys.slice(1, keys.length)
  return transformScores(remainingKeys, props, {
    ...acc,
    [type]: { userIds, value }
  })
}

export const buildMakeScore = (): MakeScore => {
  return (props: MakeScoreProps = {}): Score => {
    const scoreKeys: ScoreKey[] = ['likes', 'rejects', 'stars']
    const scores = transformScores(scoreKeys, props)

    return Object.freeze(scores)
  }
}
