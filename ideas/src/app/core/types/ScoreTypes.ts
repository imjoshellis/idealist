type Score = Readonly<{
  type: ScoreNames
  userIds: readonly string[]
  value: number
}>

type PartialScore = Readonly<{
  type: ScoreNames
  userIds?: readonly string[]
  value?: number
}>

type MaybeScore = PartialScore | Score

type MakeScore = (score: PartialScore) => Score

enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export { Score, PartialScore, MakeScore, ScoreNames, MaybeScore }
