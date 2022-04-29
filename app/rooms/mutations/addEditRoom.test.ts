import { managerCtx } from "app/test-utils"
import addEditRoom from "./addEditRoom"

test("Add Edit room", async () => {
  const room = await addEditRoom({ id: 5, number: "555" }, managerCtx)
  console.log(room)
  expect(room).toBeDefined()
})
