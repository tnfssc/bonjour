import { Ctx } from "blitz"
import db, { Customer } from "db"
import api from "../service"

const getAllCustomers = async ({}, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") return await db.customer.findMany()
}

// const getAllCustomers = async ({}, ctx: Ctx): Promise<Customer[] | null | undefined> => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "MANAGER") return (await api.get("/all")).data
// }
export default getAllCustomers
