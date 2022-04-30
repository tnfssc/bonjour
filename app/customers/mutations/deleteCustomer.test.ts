import { managerCtx } from "app/test-utils"
import deleteCustomer from "./deleteCustomer"

test("Delete customer", async () => {
  const customer = await deleteCustomer({ email: "Damion34@hotmail.com" }, managerCtx)
  console.log(customer)
  expect(customer).toBeDefined()
})
