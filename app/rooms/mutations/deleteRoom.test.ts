import { managerCtx } from "app/test-utils"
import deleteRoom from "./deleteRoom"

test("Delete room", async () => {
  const room = await deleteRoom({ id: 5 }, managerCtx)
  console.log(room)
  expect(room).toBeDefined()
})
