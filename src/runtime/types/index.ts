import type { OP } from './enum'

export * from './kasplexApiTypes'

export interface Params {
  [key: string]: string | number | boolean | Array<string>
}

export interface Krc20Data {
  p: 'krc-20'
  op: OP
  tick?: string
  mod?: string
  name?: string
  max?: string
  lim?: string
  amt?: string
  to?: string
  dec?: string
  pre?: string
  ca?: string
}
