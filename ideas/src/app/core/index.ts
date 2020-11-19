import { buildMakeIdea } from './entities/idea'
import { makeEmptyScores, buildGetScore } from './entities/score.utils'
import { Text, Id } from './core.deps'

const makeIdea = buildMakeIdea({ Text, Id, buildGetScore, makeEmptyScores })

export { makeIdea }
export * from './entities/idea'
export * from './entities/idea.types'
export * from './entities/score'
export * from './entities/score.types'
export * from './entities/score.utils'
