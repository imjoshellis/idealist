import { RepositoryIdea } from '../app.types'

export type CreateRepository = {
  insert: (idea: RepositoryIdea) => Promise<RepositoryIdea>
}
