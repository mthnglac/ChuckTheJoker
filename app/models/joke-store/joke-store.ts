import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { JokeModel, JokeSnapshot } from "../joke/joke"
import { JokeApi } from "../../services/api/joke-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const JokeStoreModel = types
  .model("JokeStore")
  .props({
    joke: types.maybe(JokeModel),
    jokes: types.optional(types.array(JokeModel), []),
    loading: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setLoading: (isLoading: boolean) => {
      self.loading = isLoading
    },
  }))
  .actions((self) => ({
    saveJoke: (jokeSnapshot: JokeSnapshot) => {
      self.joke = jokeSnapshot
    },
  }))
  .actions((self) => ({
    saveJokes: (jokeSnapshots: JokeSnapshot[]) => {
      self.jokes.replace(jokeSnapshots)
    },
  }))
  .actions((self) => ({
    fetchRandomJoke: flow(function* () {
      self.setLoading(true)
      const jokeApi = new JokeApi(self.environment.api)
      const result = yield jokeApi.fetchRandomJoke()

      if (result.kind === "ok") {
        self.saveJoke(result.joke)
        self.setLoading(false)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))
  .actions((self) => ({
    fetchJokeByCategory: flow(function* (category: string) {
      self.setLoading(true)
      const jokeApi = new JokeApi(self.environment.api)
      const result = yield jokeApi.fetchJokeByCategory(category)

      if (result.kind === "ok") {
        self.saveJoke(result.joke)
        self.setLoading(false)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))
  .actions((self) => ({
    fetchJokesByQuery: flow(function* (query: string) {
      self.setLoading(true)
      const jokeApi = new JokeApi(self.environment.api)
      const result = yield jokeApi.fetchJokesByQuery(query)

      if (result.kind === "ok") {
        self.saveJokes(result.jokes)
        self.setLoading(false)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type JokeStoreType = Instance<typeof JokeStoreModel>
export interface JokeStore extends JokeStoreType {}
type JokeStoreSnapshotType = SnapshotOut<typeof JokeStoreModel>
export interface JokeStoreSnapshot extends JokeStoreSnapshotType {}
export const createJokeStoreDefaultModel = () => types.optional(JokeStoreModel, {})
