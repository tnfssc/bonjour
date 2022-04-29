import { Middleware } from "blitz"
import { getSession } from "next-auth/react"
import db from "db"

const sessionMiddleware = (): Middleware => async (req, res, next) => {
  const session = await getSession({ req })
  if (session?.user?.email) {
    const { id } = (await db.user.findUnique({ where: { email: session.user.email } }))!
    res.blitzCtx.user = { id, role: null }
    if (await db.manager.findUnique({ where: { id } }))
      res.blitzCtx.user = { ...res.blitzCtx.user, ...session.user, role: "MANAGER" }
    else if (await db.customer.findUnique({ where: { id } }))
      res.blitzCtx.user = { ...res.blitzCtx.user, ...session.user, role: "CUSTOMER" }
  }
  await next()
}

export default sessionMiddleware
