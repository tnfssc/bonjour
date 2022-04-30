import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "db"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    signIn: async ({ user }) => {
      if (!user.email) return false
      if (await prisma.manager.findUnique({ where: { id: user.id } })) return true
      if (!(await prisma.customer.findUnique({ where: { id: user.id } })))
        await prisma.customer.create({
          data: {
            firstName: user.name ?? "",
            phone: "",
            id: user.id,
          },
        })
      return true
    },
  },
})
