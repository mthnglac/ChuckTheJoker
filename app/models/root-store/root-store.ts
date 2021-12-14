import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { JokeStoreModel } from "../joke-store/joke-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  jokeStore: types.optional(JokeStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
