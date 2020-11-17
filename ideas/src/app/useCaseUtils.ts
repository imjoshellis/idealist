type Eq<T> = (x: T) => (y: T) => boolean
export const not: Eq<unknown> = x => y => x !== y
