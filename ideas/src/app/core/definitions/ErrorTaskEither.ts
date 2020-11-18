import { TaskEither } from 'fp-ts/lib/TaskEither'

export type ErrorTaskEither<T> = TaskEither<Error, T>
