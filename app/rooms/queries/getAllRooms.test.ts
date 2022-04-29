import { managerCtx } from "app/test-utils"
import getAllRooms from "./getAllRooms"

test.skip("getAllRooms returns all rooms", async () => {
  const rooms = await getAllRooms({}, managerCtx)
  console.log(rooms)
  expect(rooms).toBeDefined()
  expect(rooms!.length).toBeTruthy()
})
