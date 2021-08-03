import { JokeStoreModel } from "./joke-store"

test("can be created", () => {
  const instance = JokeStoreModel.create({})

  expect(instance).toBeTruthy()
})
