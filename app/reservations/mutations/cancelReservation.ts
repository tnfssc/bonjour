import { Ctx } from "blitz"
import db, { Reservation } from "db"

import api from "../service"

export type CancelReservationInput = Pick<Reservation, "id">

const cancelReservation = async ({ id }: CancelReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER") {
    if (await db.reservation.findFirst({ where: { id, customer_id: user.id } })) {
      return await db.reservation.update({
        where: { id },
        data: { valid: false },
      })
    }
  }
  if (user.role === "MANAGER")
    return await db.reservation.update({ where: { id }, data: { valid: false } })

  // @TODO Refund
}

// const cancelReservation = async ({ id }: CancelReservationInput, ctx: Ctx) => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "CUSTOMER") {
//     if (await db.reservation.findFirst({ where: { id, customer_id: user.id } })) {
//       return await api.get<Reservation>("/4", { id }).data
//     }
//   }
//   if (user.role === "MANAGER") return await api.get<Reservation>("/4", { id }).data

//   // @TODO Refund
// }

export default cancelReservation
