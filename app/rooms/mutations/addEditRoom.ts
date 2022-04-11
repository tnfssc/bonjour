import { Ctx } from "blitz"
import db from "db"

export type AddEditRoomInput = {
  id: number
  suite?: string
  number: string
  capacity?: number
}

const addEditRoom = async ({ capacity, number, id, suite }: AddEditRoomInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user || user.role !== "MANAGER") return
  return await db.room.upsert({
    where: { id },
    create: { suite, capacity, number },
    update: { suite, capacity, number },
  })
}

export default addEditRoom
