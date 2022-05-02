import { Ctx } from "blitz"

import db, { Customer } from "db"

// import { Customer } from "db"
import api from "../service"

export type AddEditCustomerInput = Partial<Customer>

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

// const addEditCustomer = async (
//   { id, firstName, phone, ...rest }: AddEditCustomerInput,
//   ctx: Ctx
// ) => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "CUSTOMER")
//     return (await api.post<Customer>("/", { id: user.id, firstName, phone, ...rest })).data
//   if (user.role === "MANAGER")
//     (await api.post<Customer>("/", { id, firstName, phone, ...rest })).data
// }

export default addEditCustomer
