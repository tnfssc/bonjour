import { Ctx } from "blitz"
import db, { Customer } from "db"

export type AddEditCustomerInput = Customer

const addEditCustomer = async (
  { id, firstName, phone, ...rest }: AddEditCustomerInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER") {
    return await db.customer.upsert({
      where: { id: user.id },
      create: { id: user.id, firstName, phone, ...rest },
      update: { firstName, phone, ...rest },
    })
  }
  if (user.role === "MANAGER") {
    return await db.customer.upsert({
      where: { id },
      create: { ...rest, id, firstName, phone },
      update: { ...rest, firstName, phone },
    })
  }
}

export default addEditCustomer
