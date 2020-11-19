import { EitherAsync } from 'purify-ts'
import { RepositoryIdea } from '../app.types'

export type CreateOutput = EitherAsync<Error, RepositoryIdea>
