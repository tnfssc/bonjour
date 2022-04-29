import { Ctx } from "blitz"
// import db, { Reservation, Room } from "db"

import { Reservation, Room } from "db"
import api from "../service"

export type AvailableRoomsInput = Pick<Reservation, "check_in" | "check_out"> &
  Pick<Room, "capacity" | "suite"> & { check_out: Date }

// const availableRooms = async (
//   { capacity = 0, check_in, check_out, suite }: AvailableRoomsInput,
//   ctx: Ctx
// ) => {
//   const { user } = ctx
//   console.log(user)
//   if (!user) return
//   if (user.role === "CUSTOMER" || user.role === "MANAGER")
//     return await db.room.findMany({
//       where: {
//         valid: true,
//         capacity: { gte: capacity },
//         suite,
//         reservations: {
//           none: {
//             AND: {
//               valid: true,
//               OR: [
//                 {
//                   AND: {
//                     check_in: { gte: check_in },
//                     check_out: { lt: check_in },
//                   },
//                 },
//                 {
//                   AND: {
//                     check_in: { gt: check_out },
//                     check_out: { lte: check_out },
//                   },
//                 },
//                 {
//                   AND: {
//                     check_in: { lte: check_in },
//                     check_out: { gte: check_out },
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       },
//     })
// }

const availableRooms = async (
  { capacity = 0, check_in, check_out, suite }: AvailableRoomsInput,
  ctx: Ctx
) => {
  const { user } = ctx
  console.log(user)
  if (!user) return
  if (user.role === "CUSTOMER" || user.role === "MANAGER")
    return await (
      await api.get("/1", { params: { capacity, check_in, check_out, suite } })
    ).data
}

export default availableRooms
