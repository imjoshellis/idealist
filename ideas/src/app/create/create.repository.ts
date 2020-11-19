import { RepositoryIdea } from '../app.types'

export type CreateRepository = {
  insert: (obj: any) => Promise<RepositoryIdea>
}
