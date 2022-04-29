import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type DeleteReservationInput = Pick<Reservation, "id">

const deleteReservation = async ({ id }: DeleteReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") return await db.reservation.delete({ where: { id } })
}

export default deleteReservation
