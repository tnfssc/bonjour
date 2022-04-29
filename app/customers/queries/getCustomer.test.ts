import { managerCtx } from "app/test-utils"
import getCustomer from "./getCustomer"

test("getCustomersRooms returns all rooms", async () => {
  const customer = await getCustomer({ email: "Dayne.Nienow@hotmail.com" }, managerCtx)
  console.log(customer)
  expect(customer).toBeDefined()
})
