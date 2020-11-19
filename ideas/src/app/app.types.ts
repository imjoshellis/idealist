import { BaseIdea, BaseScore } from './core'

export type RepositoryScore = BaseScore & {
  value: number
}

export type RepositoryIdea = BaseIdea & {
  scores: RepositoryScore[]
}
