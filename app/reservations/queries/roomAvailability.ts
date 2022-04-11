import { Ctx } from "blitz"
import db, { Reservation } from "db"

export type GetReservationInput = Pick<Reservation, "room_id" | "check_in" | "check_out"> & {
  check_out: Date
}

const roomAvailability = async (
  { room_id, check_in, check_out }: GetReservationInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") {
    const room = await db.room.findUnique({ where: { id: room_id } })
    if (!room?.valid) return false
    const reservations = await db.reservation.findMany({
      where: {
        valid: true,
        room_id,
        OR: [
          {
            AND: {
              check_in: { gte: check_in },
              check_out: { lt: check_in },
            },
          },
          {
            AND: {
              check_in: { gt: check_out },
              check_out: { lte: check_out },
            },
          },
          {
            AND: {
              check_in: { lte: check_in },
              check_out: { gte: check_out },
            },
          },
        ],
      },
    })
    if (reservations.length > 0) return false
    return true
  }
}

export default roomAvailability
