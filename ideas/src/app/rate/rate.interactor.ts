import { RateInput } from './rate.in'
import { RateRepository } from './rate.repository'

type RateInteractor = (input: RateInput) => null
type MakeRateInteractor = (deps: { ideaDb: RateRepository }) => RateInteractor

export const makeRateInteractor: MakeRateInteractor = ({ ideaDb }) => idea => {
  ideaDb.findById(idea.unsafeCoerce().id)
  return null
}
