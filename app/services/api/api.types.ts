import { GeneralApiProblem } from "./api-problem"
import { Joke } from "../../models/joke/joke"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetJokesResult = { kind: "ok"; jokes: Joke[] } | GeneralApiProblem
export type GetJokeResult = { kind: "ok"; joke: Joke } | GeneralApiProblem
