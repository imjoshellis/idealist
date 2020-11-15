interface MakeIdeaProps {
  text: string
}

export const buildMakeIdea = () => {
  return ({ text }: MakeIdeaProps) => Object.freeze({ getText: () => text })
}
