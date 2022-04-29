import { Ctx } from "blitz"
import db, { Room } from "db"
import api from "../service"

import getRooms from "./getRooms"

/* const getAllRooms = async ({}, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  return getRooms({}, ctx)
} */

const getAllRooms = async ({}, ctx: Ctx): Promise<Room[] | null | undefined> => {
  const { user } = ctx
  if (!user) return
  if (user.role === "MANAGER") return (await api.get("/all")).data
}

export default getAllRooms
