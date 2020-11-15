interface BuildMakeIdeaProps {
  sanitize: (text: string) => string
  Id: {
    makeId: () => string
  }
}

interface MakeIdeaProps {
  text: string
  id?: string
  userId: string
}

export const buildMakeIdea = ({ sanitize, Id }: BuildMakeIdeaProps) => {
  return ({ text, id = Id.makeId(), userId }: MakeIdeaProps) => {
    const sanitizedText = sanitize(text).trim()
    if (!sanitizedText || sanitizedText.length < 2)
      throw new Error('Idea must have valid text')

    return Object.freeze({
      getText: () => sanitizedText,
      getId: () => id,
      getUserId: () => userId
    })
  }
}
