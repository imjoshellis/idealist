type Score = Readonly<
  {
    [type in ScoreKeys]: {
      userIds: string[]
      value: number
    }
  }
>

type PartialScore = Readonly<
  {
    [type in ScoreKeys]?: {
      userIds: string[]
      value: number
    }
  }
>

type MakeScoreProps = {
  [type in ScoreKeys]?: string[]
}

type MakeScore = (props?: MakeScoreProps) => Score

enum ScoreKeys {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export { Score, PartialScore, MakeScore, MakeScoreProps, ScoreKeys }
