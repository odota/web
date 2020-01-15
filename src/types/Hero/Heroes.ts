import { Hero } from 'src/types/Hero/Hero'

export type Heroes = {
  [heroId in string]: Hero
}
