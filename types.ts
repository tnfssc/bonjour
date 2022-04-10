import { DefaultCtx } from "blitz"
import { User as NextAuthUser } from "next-auth"

export type User = (NextAuthUser & { role: "MANAGER" | "CUSTOMER" | null }) | null

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    user: User
  }
}
