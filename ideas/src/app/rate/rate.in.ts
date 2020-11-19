import { Either } from 'purify-ts'
import { Idea } from '../core'

export type RateInput = Either<Error, Idea>
