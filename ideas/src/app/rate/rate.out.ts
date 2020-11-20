import { EitherAsync } from 'purify-ts'
import { RepositoryIdea } from '../app.types'

export type RateOutput = EitherAsync<Error, RepositoryIdea>
