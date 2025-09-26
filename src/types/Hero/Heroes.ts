import { Hero } from './Hero'

export type Heroes = {
  [heroId in string]: Hero
}
