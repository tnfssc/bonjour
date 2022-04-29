import { BlitzApiHandler } from "blitz"
import { getSession } from "next-auth/react"

const handler: BlitzApiHandler<{ content?: string; error?: string }> = async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      content: "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    })
  }
}

export default handler
