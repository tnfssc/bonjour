import { Ctx } from "blitz"
import db from "db"
import api from "../service"

export type DeleteRoomInput = {
  id: number
}

/* const deleteRoom = async ({ id }: DeleteRoomInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user || user.role !== "MANAGER") return
  return await db.room.delete({ where: { id } })
}
 */
const deleteRoom = async ({ id }: DeleteRoomInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER")
    return (await api.delete<DeleteRoomInput>("/", { params: { id } })).data
}
export default deleteRoom
