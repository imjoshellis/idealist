import { buildMakeIdea } from './idea'
import sanitizeHtml from 'sanitize-html'

const sanitize = (text: string) => sanitizeHtml(text)

export const makeIdea = buildMakeIdea({ sanitize })
