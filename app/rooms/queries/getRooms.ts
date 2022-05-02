import { Ctx } from "blitz"
import db, { RoomType } from "db"
import api from "../service"

export type GetRoomsInput = {
  id?: number
  suite?: Array<RoomType>
  number?: Array<string>
  capacity?: number
}

const getRooms = async ({ capacity, number, id, suite }: GetRoomsInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  // if (user.role !== "MANAGER") return await db.room.findUnique({ where: { id } })
  if (id) return await db.room.findUnique({ where: { id } })
  return await db.room.findMany({
    where: { suite: { in: suite }, capacity: { gte: capacity }, number: { in: number } },
  })
}

// const getRooms = async (
//   { capacity, number, id, suite }: GetRoomsInput,
//   ctx: Ctx
// ): Promise<GetRoomsInput | null | undefined> => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "CUSTOMER") return (await api.get("/", { params: { id } })).data
//   if (user.role === "MANAGER") return (await api.get("/", { params: { id } })).data
// }

export default getRooms
