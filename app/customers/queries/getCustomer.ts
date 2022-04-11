import { Ctx } from "blitz"
import db from "db"

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

export default getCustomer
