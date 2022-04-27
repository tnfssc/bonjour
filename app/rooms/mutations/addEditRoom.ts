import { Ctx } from "blitz"
import db, { RoomType } from "db"

export type AddEditRoomInput = {
  id: number
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

export default addEditRoom
