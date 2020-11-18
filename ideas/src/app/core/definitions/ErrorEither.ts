import { Either } from 'fp-ts/lib/Either'
export type ErrorEither<T> = Either<Error, T>
