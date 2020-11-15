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
}

export const buildMakeIdea = ({ sanitize, Id }: BuildMakeIdeaProps) => {
  return ({ text, id = Id.makeId(), userId }: MakeIdeaProps) => {
    if (!Id.isValid(id)) throw new Error('Idea must have valid id')

    const sanitizedText = sanitize(text).trim()
    if (!sanitizedText || sanitizedText.length < 2)
      throw new Error('Idea must have valid text')

    return Object.freeze({
      getText: () => sanitizedText,
      getId: () => id,
      getUserId: () => userId,
      countStars: () => 0
    })
  }
}
