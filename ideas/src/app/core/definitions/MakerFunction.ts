import { ErrorEither } from './ErrorEither'
import { UnionType } from './Maybe'

export type MakerFunction<Partial, Result> = (
  input: UnionType<Partial, Result>
) => ErrorEither<Result>
