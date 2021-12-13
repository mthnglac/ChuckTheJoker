import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Joke } from "../../models/joke/joke"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetJokesResult = { kind: "ok"; jokes: Joke[] } | GeneralApiProblem
export type GetJokeResult = { kind: "ok"; joke: Joke } | GeneralApiProblem
