import { managerCtx } from "app/test-utils"
import getAllCustomers from "./getAllCustomers"

test("getCustomersRooms returns all rooms", async () => {
  const customers = await getAllCustomers({}, managerCtx)
  console.log(customers)
  expect(customers).toBeDefined()
})
