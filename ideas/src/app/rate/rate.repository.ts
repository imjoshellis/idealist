import { RepositoryIdea } from '../app.types'

export type RateRepository = {
  findById: (id: string) => Promise<RepositoryIdea | undefined>
  update: (obj: any) => Promise<RepositoryIdea>
}
