import {
  MakeScore,
  MakeScoreProps,
  Score,
  ScoreNames
} from '../types/ScoreTypes'

export const buildMakeScore = (): MakeScore => {
  return (props: MakeScoreProps = {}): Score => {
    const { STARS, LIKES, REJECTS } = ScoreNames
    const scores = {
      [STARS]: [...new Set(props[STARS])],
      [LIKES]: [...new Set(props[LIKES])],
      [REJECTS]: [...new Set(props[REJECTS])]
    }

    return Object.freeze({
      getUserIds: (type: ScoreNames) => scores[type],
      getValue: (type: ScoreNames) => scores[type].length
    })
  }
}
