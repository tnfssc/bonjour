import { Ctx } from "blitz"
import db from "db"

const getAllCustomers = async ({}, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") return await db.customer.findMany()
}

export default getAllCustomers
