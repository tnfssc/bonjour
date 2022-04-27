import { Ctx } from "blitz"
import db from "db"

const getDetails = async (_: undefined, ctx: Ctx) => {
  console.log(ctx)
  const { user } = ctx
  if (!user) return []
  const rooms = (await db.room.findMany())!
  return rooms
}

export default getDetails
