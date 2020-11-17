import {
  MakeScore,
  MakeScoreProps,
  PartialScore,
  Score,
  ScoreKeys
} from '../types/ScoreTypes'

const transformScoreProps = (
  props: MakeScoreProps,
  keys: ScoreKeys[] = Object.values(ScoreKeys),
  acc: PartialScore = {}
): Score => {
  if (keys.length === 0) return acc as Score
  const key = keys[0]
  const userIds = [...new Set(props[key])]
  const value = userIds.length
  const remainingKeys = keys.slice(1, keys.length)
  return transformScoreProps(props, remainingKeys, {
    ...acc,
    [key]: { userIds, value }
  })
}

export const buildMakeScore = (): MakeScore => {
  return (props: MakeScoreProps = {}): Score => {
    const score = transformScoreProps(props)
    return Object.freeze(score)
  }
}
