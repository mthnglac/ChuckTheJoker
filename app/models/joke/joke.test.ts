import { JokeModel } from "./joke"

test("can be created", () => {
  const instance = JokeModel.create({})

  expect(instance).toBeTruthy()
})
