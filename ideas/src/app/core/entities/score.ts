interface MakeScoreProps {
  userStars: string[]
}
export const buildMakeScore = () => {
  return ({ userStars }: MakeScoreProps) => {
    const userStarsSet = new Set(userStars)

    return Object.freeze({
      getUserStars: () => [...userStarsSet]
    })
  }
}
