import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type EditReservationInput = Reservation

const editReservation = async (
  { customer_id, room_id, ...rest }: EditReservationInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER")
    return await db.reservation.upsert({
      where: { customer_id_room_id: { customer_id, room_id } },
      create: { customer_id, room_id, ...rest },
      update: { customer_id, room_id, ...rest },
    })
}

export default editReservation
