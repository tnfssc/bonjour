import { Ctx } from "blitz"
// import db, { Reservation } from "db"

import { Reservation } from "db"
import api from "../service"

import roomAvailability from "../queries/roomAvailability"

export type EditReservationInput = Reservation & { check_out: Date }

// const editReservation = async (
//   { customer_id, room_id, id, ...rest }: EditReservationInput,
//   ctx: Ctx
// ) => {
//   const { user } = ctx
//   if (!user) return
//   if (
//     !(await roomAvailability(
//       { room_id: room_id, check_in: rest.check_in, check_out: rest.check_out },
//       ctx
//     ))
//   )
//     return
//   if (user.role === "MANAGER")
//     return await db.reservation.upsert({
//       where: { id },
//       create: { customer_id, room_id, ...rest },
//       update: { customer_id, room_id, ...rest },
//     })
// }

const editReservation = async (
  { customer_id, room_id, bookingPrice, id, ...rest }: EditReservationInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  if (
    !(await roomAvailability(
      { room_id: room_id, check_in: rest.check_in, check_out: rest.check_out },
      ctx
    ))
  )
    return
  if (user.role === "MANAGER")
    return (
      await api.post<Reservation>("/2", {
        customer_id,
        room_id,
        bookingPrice: parseInt(`${bookingPrice}`),
        id,
        ...rest,
      })
    ).data
}

export default editReservation
