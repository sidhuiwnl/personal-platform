import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import type { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient()

const handler = NextAuth({
    adapter : PrismaAdapter(prisma) as Adapter,
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
          })
    ]

})

export { handler as GET, handler as POST }