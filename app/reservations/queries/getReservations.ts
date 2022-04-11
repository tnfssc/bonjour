import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type GetReservationInput =
  | { customer_id: string; room_id?: never }
  | { room_id: number; customer_id?: never }

const getReservation = async ({ customer_id, room_id }: GetReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER")
    return await db.reservation.findMany({ where: { customer_id: user.id, room_id } })
  if (user.role === "MANAGER") {
    if (!customer_id || !room_id)
      return await db.reservation.findMany({ where: { customer_id, room_id } })
    return await db.reservation.findUnique({
      where: { customer_id_room_id: { customer_id, room_id } },
    })
  }
}

export default getReservation
