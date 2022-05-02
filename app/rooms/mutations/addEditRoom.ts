import { Ctx } from "blitz"
import db, { RoomType } from "db"
import api from "../service"

export type AddEditRoomInput = {
  id?: number
  suite?: RoomType
  number: string
  capacity?: number
}

const addEditRoom = async ({ id, suite, capacity, number }: AddEditRoomInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user || user.role !== "MANAGER") return
  return await db.room.upsert({
    where: { id },
    create: { suite, capacity, number },
    update: { suite, capacity, number },
  })
}

// const addEditRoom = async ({ id, suite, capacity, number }: AddEditRoomInput, ctx: Ctx) => {
//   const { user } = ctx
//   if (!user) return
//   if (user.role === "MANAGER")
//     return (await api.post<AddEditRoomInput[]>("/", { id, suite, capacity, number })).data
// }

export default addEditRoom
