import { getSession as getNextAuthSession } from "next-auth/react"
import db from "db"

const getSession: typeof getNextAuthSession = async (params) => {
  const session = await getNextAuthSession(params)
  if (!session?.user?.email) return session
  const user = (await db.user.findUnique({ where: { email: session.user.email } }))!
  const manager = await db.manager.findUnique({ where: { id: user.id } })
  let role = "CUSTOMER"
  if (manager) role = "MANAGER"
  if (!user) return session
  return { ...session, user, role }
}

export default getSession
