type Score = Readonly<
  {
    [type in ScoreKey]: {
      userIds: string[]
      value: number
    }
  }
>

type PartialScore = Readonly<
  {
    [type in ScoreKey]?: {
      userIds: string[]
      value: number
    }
  }
>

type MakeScoreProps = {
  [type in ScoreKey]?: string[]
}

type MakeScore = (props: MakeScoreProps) => Score

type ScoreKey = 'stars' | 'likes' | 'rejects'

enum ScoreNames {
  STARS = 'stars',
  LIKES = 'likes',
  REJECTS = 'rejects'
}

export { Score, PartialScore, MakeScore, MakeScoreProps, ScoreNames, ScoreKey }
