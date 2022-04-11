import { Ctx } from "blitz"
import db from "db"

export type DeleteCustomerInput = { id: string; email?: never } | { email: string; id?: never }

const deleteCustomer = async ({ email, id }: DeleteCustomerInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user || user.role !== "MANAGER") return
  if (id) return await db.customer.delete({ where: { id } })
  if (email) {
    const { id } = (await db.user.findUnique({ where: { email } }))!
    return await db.customer.delete({ where: { id } })
  }
}

export default deleteCustomer
