import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type GetReservationsInput = Partial<
  Pick<Reservation, "id" | "customer_id" | "room_id" | "valid">
>

const getReservations = async (
  { customer_id, room_id, id, valid }: GetReservationsInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER")
    return await db.reservation.findMany({ where: { customer_id: user.id, id, room_id, valid } })
  if (user.role === "MANAGER")
    if (!customer_id || !room_id || !id)
      return await db.reservation.findMany({ where: { customer_id, room_id, id, valid } })
}

export default getReservations
