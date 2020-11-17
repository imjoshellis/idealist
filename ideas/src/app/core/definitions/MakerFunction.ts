import { Maybe } from './Maybe'

export type MakerFunction<Partial, Result> = (
  input: Maybe<Partial, Result>
) => Result
