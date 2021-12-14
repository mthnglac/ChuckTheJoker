import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import * as Types from "./api.types"

const API_PAGE_SIZE = 10

export class JokeApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async fetchJokesByQuery(query: string): Promise<Types.GetJokesResult> {
    const urlQuery = `search?query=${query}`

    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(urlQuery, {
      amount: API_PAGE_SIZE,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertJoke = (raw: Types.Joke) => {
      return {
        id: raw.id,
        value: raw.value,
      }
    }

    try {
      const jokes = response.data.result
      const convertedJokes = jokes.map(convertJoke)

      return { kind: "ok", jokes: convertedJokes }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchRandomJoke(): Promise<Types.GetJokeResult> {
    const urlQuery = "/random"

    const response: ApiResponse<any> = await this.api.apisauce.get(urlQuery)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertedJoke: Types.Joke = {
      id: response.data.id,
      value: response.data.value,
    }

    try {
      return { kind: "ok", joke: convertedJoke }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchJokeByCategory(category: string): Promise<Types.GetJokeResult> {
    const urlQuery = `/random?category=${category}`

    const response: ApiResponse<any> = await this.api.apisauce.get(urlQuery)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const convertedJoke: Types.Joke = {
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
