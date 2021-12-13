import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetJokeResult, GetJokesResult } from "./api.types"
import { Joke } from "../../models/joke/joke"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 10

export class JokeApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async fetchJokesByQuery(query: string): Promise<GetJokesResult> {
    const urlQuery = `search?query=${query}`

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(urlQuery, {
        amount: API_PAGE_SIZE,
      })

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const convertJoke = (raw: any) => {
        return {
          id: raw.id,
          value: raw.value,
        }
      }
      const jokes = response.data.result
      const convertedJokes = jokes.map(convertJoke)

      return { kind: "ok", jokes: convertedJokes }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchRandomJoke(): Promise<GetJokeResult> {
    const urlQuery = "/random"

    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(urlQuery)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const convertedJoke: Joke = {
        id: response.data.id,
        value: response.data.value,
      }

      return { kind: "ok", joke: convertedJoke }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchJokeByCategory(category: string): Promise<GetJokeResult> {
    const urlQuery = `/random?category=${category}`

    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(urlQuery)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const convertedJoke: Joke = {
        id: response.data.id,
        value: response.data.value,
      }

      return { kind: "ok", joke: convertedJoke }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
