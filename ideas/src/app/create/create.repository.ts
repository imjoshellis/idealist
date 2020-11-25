import { RepositoryIdea } from '../app.types'

export interface CreateRepository {
  insert: (idea: RepositoryIdea) => Promise<RepositoryIdea>
}
