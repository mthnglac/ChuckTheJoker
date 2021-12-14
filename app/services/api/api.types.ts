import { GeneralApiProblem } from "./api-problem"

export interface Joke {
  id: number
  value: string
}

export type GetJokesResult = { kind: "ok"; jokes: Joke[] } | GeneralApiProblem
export type GetJokeResult = { kind: "ok"; joke: Joke } | GeneralApiProblem
