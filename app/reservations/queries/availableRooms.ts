import { Ctx } from "blitz"
import db, { Reservation, Room } from "db"

export type AvailableRoomsInput = Pick<Reservation, "check_in" | "check_out"> &
  Pick<Room, "capacity" | "suite"> & { check_out: Date }

const availableRooms = async (
  { capacity, check_in, check_out, suite }: AvailableRoomsInput,
  ctx: Ctx
) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "CUSTOMER" || user.role === "MANAGER")
    return await db.room.findMany({
      where: {
        capacity: { gte: capacity },
        suite,
        reservations: {
          none: {
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
        },
      },
    })
}

export default availableRooms
