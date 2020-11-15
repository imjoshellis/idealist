interface MakeIdeaProps {
  text: string
}

export const buildMakeIdea = () => {
  return ({ text }: MakeIdeaProps) => {
    if (!text || text.length < 2) throw new Error('Idea must have valid text')
    return Object.freeze({ getText: () => text })
  }
}
