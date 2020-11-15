interface BuildMakeIdeaProps {
  sanitize: (text: string) => string
}

interface MakeIdeaProps {
  text: string
}

export const buildMakeIdea = ({ sanitize }: BuildMakeIdeaProps) => {
  return ({ text }: MakeIdeaProps) => {
    const sanitizedText = sanitize(text)
    if (!sanitizedText || sanitizedText.length < 2)
      throw new Error('Idea must have valid text')

    return Object.freeze({ getText: () => sanitizedText })
  }
}
