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
  starUserIds?: string[]
}

export const buildMakeIdea = ({ sanitize, Id }: BuildMakeIdeaProps) => {
  return ({
    text,
    id = Id.makeId(),
    userId,
    starUserIds = []
  }: MakeIdeaProps) => {
    if (!Id.isValid(id)) throw new Error('Idea must have valid id')

    const sanitizedText = sanitize(text).trim()
    if (!sanitizedText || sanitizedText.length < 2)
      throw new Error('Idea must have valid text')

    return Object.freeze({
      getText: () => sanitizedText,
      getId: () => id,
      getUserId: () => userId,
      countStars: () => starUserIds.length,
      addStar: (userId: string) => {
        if (starUserIds.some(u => userId === u)) return
        starUserIds = [...starUserIds, userId]
      }
    })
  }
}
