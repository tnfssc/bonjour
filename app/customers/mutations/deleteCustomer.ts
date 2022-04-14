import { Ctx } from "blitz"

// import db from "db"

import { Customer } from "db"
import api from "../service"

export type DeleteCustomerInput = { id: string; email?: never } | { email: string; id?: never }

const deleteCustomer = async ({ email, id }: DeleteCustomerInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") return (await api.get<Customer>("/", { params: { id, email } })).data
}

export default deleteCustomer
