import { MakeScoreProps, PartialScore, ScoreKeys } from './core/types'
import { InsertedScore } from './useCaseTypes'

export const buildMakeScoreProps = (
  fn: (a: string[]) => string[],
  scoreFromDb: InsertedScore,
  targetKey: ScoreKeys,
  keys: ScoreKeys[] = Object.values(ScoreKeys),
  acc: PartialScore = {}
): MakeScoreProps => {
  if (keys.length === 0) return Object.freeze(acc) as MakeScoreProps
  const [currentKey] = keys
  const userIds =
    currentKey === targetKey
      ? fn([...scoreFromDb[currentKey].userIds])
      : [...scoreFromDb[currentKey].userIds]
  const remainingKeys = keys.slice(1, keys.length)
  return buildMakeScoreProps(fn, scoreFromDb, targetKey, remainingKeys, {
    ...acc,
    [currentKey]: userIds
  })
}
