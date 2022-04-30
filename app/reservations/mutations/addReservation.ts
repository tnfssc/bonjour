import { Ctx } from "blitz"
// import db, { Reservation } from "db"

import { Reservation } from "db"
import api from "../service"

// import roomAvailability from "../queries/roomAvailability"

export type AddReservationInput = Reservation & { check_out: Date }

// const addReservation = async ({ customer_id, ...rest }: AddReservationInput, ctx: Ctx) => {
//   const { user } = ctx
//   if (!user) return
//   if (
//     !(await roomAvailability(
//       { room_id: rest.room_id, check_in: rest.check_in, check_out: rest.check_out },
//       ctx
//     ))
//   )
//     return
//   // @TODO: payment
//   if (user.role === "CUSTOMER")
//     return await db.reservation.create({ data: { customer_id: user.id, ...rest } })
//   if (user.role === "MANAGER")
//     return await db.reservation.create({ data: { customer_id, ...rest } })
// }

const addReservation = async (
  { customer_id, bookingPrice, ...rest }: AddReservationInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  // @TODO: payment
  if (user.role === "CUSTOMER")
    return (
      await api.post<Reservation>("/1", {
        customer_id: user.id,
        bookingPrice: parseInt(`${bookingPrice}`),
        ...rest,
      })
    ).data
  if (user.role === "MANAGER")
    return (
      await api.post<Reservation>("/1", {
        customer_id,
        bookingPrice: parseInt(`${bookingPrice}`),
        ...rest,
      })
    ).data
}

export default addReservation
