interface BuildMakeIdeaProps {
  sanitize: (text: string) => string
  Id: {
    makeId: () => string
    isValid: (id: string) => boolean
  }
}

interface MakeIdeaProps {
  text: string
  id?: string
  userId: string
  score?: { [type: string]: string[] }
}

export enum ScoreTypes {
  STAR = 'STAR',
  LIKE = 'LIKE',
  REJECT = 'REJECT'
}

export const buildMakeIdea = ({ sanitize, Id }: BuildMakeIdeaProps) => {
  return ({
    text,
    id = Id.makeId(),
    userId,
    score = {
      [ScoreTypes.LIKE]: [],
      [ScoreTypes.STAR]: [],
      [ScoreTypes.REJECT]: []
    }
  }: MakeIdeaProps) => {
    if (!Id.isValid(id)) throw new Error('Idea must have valid id')

    const sanitizedText = sanitize(text).trim()
    if (!sanitizedText || sanitizedText.length < 2)
      throw new Error('Idea must have valid text')

    return Object.freeze({
      getText: () => sanitizedText,
      getId: () => id,
      getUserId: () => userId,
      countScore: ({ type }: { type: ScoreTypes }) => score[type].length,
      addScore: ({ type, userId }: { type: ScoreTypes; userId: string }) => {
        if (score[type].some(u => userId === u))
          throw new Error('User has already starred this idea')
        score[type] = [...score[type], userId]
      },
      removeScore: ({ type, userId }: { type: ScoreTypes; userId: string }) => {
        if (!score[type].some(u => userId === u))
          throw new Error('User has not starred this idea')
        score[type] = score[type].filter(u => userId !== u)
      }
    })
  }
}
