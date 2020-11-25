import { BaseScore } from './core'

export type RepositoryScore = BaseScore & {
  value: number
}

export interface RepositoryIdea {
  id: string
  userId: string
  text: string
  scores: RepositoryScore[]
}
