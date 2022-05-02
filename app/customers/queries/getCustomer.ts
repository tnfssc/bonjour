import { Ctx } from "blitz"

import db, { Customer } from "db"

// import { Customer } from "db"
import api from "../service"

export type GetCustomerInput = { id: string; email?: never } | { email: string; id?: never }

const getCustomer = async ({ id, email }: GetCustomerInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER") return await db.customer.findUnique({ where: { id: user.id } })
  if (user.role === "MANAGER") {
    if (id) return await db.customer.findUnique({ where: { id } })
    if (email) {
      const { id } = (await db.user.findUnique({ where: { email } }))!
      return await db.customer.findUnique({ where: { id } })
    }
  }
}

// const getCustomer = async (
//   { id, email }: GetCustomerInput,
//   ctx: Ctx
// ): Promise<Customer | null | undefined> => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "CUSTOMER") return (await api.get("/", { params: { id: user.id, email } })).data
//   if (user.role === "MANAGER") return (await api.get("/", { params: { id, email } })).data
// }

export default getCustomer
