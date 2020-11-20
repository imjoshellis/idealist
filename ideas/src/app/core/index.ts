import { Id, Text } from './core.deps'
import { buildMakeIdea } from './entities/idea'
import { buildGetScore } from './entities/score.utils'

const makeIdea = buildMakeIdea({ Text, Id, buildGetScore })

export * from './entities/idea'
export * from './entities/idea.types'
export * from './entities/score'
export * from './entities/score.types'
export * from './entities/score.utils'
export { makeIdea }
