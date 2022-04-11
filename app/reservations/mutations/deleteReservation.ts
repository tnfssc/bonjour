import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type DeleteReservationInput = Pick<Reservation, "customer_id" | "room_id">

const deleteReservation = async ({ customer_id, room_id }: DeleteReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER")
    return await db.reservation.delete({
      where: { customer_id_room_id: { customer_id, room_id } },
    })
}

export default deleteReservation
