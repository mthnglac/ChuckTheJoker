import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const JokeModel = types.model("Joke").props({
  id: types.identifier,
  value: types.string,
})

type JokeType = Instance<typeof JokeModel>
export interface Joke extends JokeType {}
type JokeSnapshotType = SnapshotOut<typeof JokeModel>
export interface JokeSnapshot extends JokeSnapshotType {}
export const createJokeDefaultModel = () => types.optional(JokeModel, {})
