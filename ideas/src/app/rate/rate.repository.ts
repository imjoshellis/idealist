import { MaybeAsync } from 'purify-ts'
import { RepositoryIdea } from '../app.types'

export interface RateRepository {
  findById: (id: string) => MaybeAsync<RepositoryIdea>
  update: (obj: any) => Promise<RepositoryIdea>
}
