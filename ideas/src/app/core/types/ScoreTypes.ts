type Score = Readonly<
  {
    [key in ScoreKeys]: {
      userIds: string[]
      value: number
    }
  }
>

type PartialScore = Readonly<
  {
    [key in ScoreKeys]?: {
      userIds: string[]
      value?: number
    }
  }
>

type MakeScore = (props?: PartialScore) => Score

enum ScoreKeys {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export { Score, PartialScore, MakeScore, ScoreKeys }
