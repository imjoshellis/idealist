import { Either, Left, Right } from 'purify-ts'

export type Entity = {
  [key: string]: any
}

type Validate = <T extends Entity, K extends string>(
  type: K,
  is: (x: T[K]) => boolean
) => (y: T) => Either<Error, T>

export const validate: Validate = (type, is) => entity =>
  is(entity[type]) ? Right(entity) : Left(InvalidInput.of(type))

class InvalidInput extends Error {
  private constructor (type: string) {
    super(`${type} is invalid`)
  }
  static of = (type: string) => new InvalidInput(type)
}
