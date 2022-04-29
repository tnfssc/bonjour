import { managerCtx } from "app/test-utils"
import getRooms from "./getRooms"

test.skip("getRooms 2", async () => {
  const room = await getRooms({ id: 2 }, managerCtx)
  console.log(room)
  expect(room).toBeDefined()
})
