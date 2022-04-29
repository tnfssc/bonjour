import { Ctx } from "blitz"
import db from "db"

import getRooms from "./getRooms"

const getAllRooms = async ({}, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  return getRooms({}, ctx)
}

export default getAllRooms
