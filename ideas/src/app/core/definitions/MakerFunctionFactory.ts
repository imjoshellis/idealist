import { MakerFunction } from './MakerFunction'

export type MakerFunctionFactory<Deps, Partial, Result> = (
  deps: Deps
) => MakerFunction<Partial, Result>
