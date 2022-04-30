import { managerCtx } from "app/test-utils"
import addEditCustomer from "./addEditCustomer"

test("Add Edit room", async () => {
  const customer = await addEditCustomer(
    {
      id: "12738d5e-9f17-4c48-bf1c-e7ec33ee3904",
      firstName: "Danielle Tremblay MD",
      address: "Earth",
      phone: "1-829-867-9073 x869",
    },
    managerCtx
  )
  console.log(customer)
  expect(customer).toBeDefined()
})
