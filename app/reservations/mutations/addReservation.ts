import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type AddReservationInput = Reservation

const addReservation = async ({ customer_id, ...rest }: AddReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER")
    return await db.reservation.create({ data: { customer_id: user.id, ...rest } })
  if (user.role === "MANAGER")
    return await db.reservation.create({ data: { customer_id, ...rest } })
}

export default addReservation
