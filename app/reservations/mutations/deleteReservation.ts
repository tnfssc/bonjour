import { Ctx } from "blitz"
import db, { Reservation } from "db"
import api from "../service"

export type DeleteReservationInput = Pick<Reservation, "id">

const deleteReservation = async ({ id }: DeleteReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") return await db.reservation.delete({ where: { id } })
}

// const deleteReservation = async ({ id }: DeleteReservationInput, ctx: Ctx) => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "MANAGER") return (await api.delete<Reservation>("/", { params: { id } })).data
// }

export default deleteReservation
