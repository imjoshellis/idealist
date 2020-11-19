import { Either } from 'purify-ts'
import { Idea } from '../core'

export type CreateInput = Either<Error, Idea>
