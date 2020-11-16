type MakeScoreProps = {
  [type in ScoreNames]?: string[]
}

type Score = Readonly<{
  getUserIds: (type: ScoreNames) => string[]
  getValue: (type: ScoreNames) => number
}>

type MakeScore = (props?: MakeScoreProps) => Score

enum ScoreNames {
  STARS = 'stars',
  LIKES = 'likes',
  REJECTS = 'rejects'
}

export { Score, MakeScore, MakeScoreProps, ScoreNames }
