import { Ctx } from "blitz"
import db from "db"

export type DeleteRoomInput = {
  id: number
}

const deleteRoom = async ({ id }: DeleteRoomInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user || user.role !== "MANAGER") return
  return await db.room.delete({ where: { id } })
}

export default deleteRoom
