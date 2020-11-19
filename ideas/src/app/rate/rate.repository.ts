import { MaybeAsync } from 'purify-ts'
import { RepositoryIdea } from '../app.types'

export type RateRepository = {
  findById: (id: string) => MaybeAsync<RepositoryIdea>
  update: (obj: any) => Promise<RepositoryIdea>
}
