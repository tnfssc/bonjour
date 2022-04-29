import { Ctx } from "blitz"
import db, { Reservation } from "db"

import roomAvailability from "../queries/roomAvailability"

export type AddReservationInput = Reservation & { check_out: Date }

const addReservation = async ({ customer_id, ...rest }: AddReservationInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (
    !(await roomAvailability(
      { room_id: rest.room_id, check_in: rest.check_in, check_out: rest.check_out },
      ctx
    ))
  )
    return
  if (user.role === "MANAGER")
    return await db.reservation.create({ data: { customer_id, ...rest } })
}

export default addReservation
