import getServerSession, { AuthOptions, DefaultSession } from "next-auth"

import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
      } & DefaultSession["user"];
    }
  }

export const authConfig = {
    adapter : PrismaAdapter(prisma) as Adapter,
    session : {
        strategy :"jwt",
    },
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
          })
    ],
    callbacks: {
        async jwt({ token, user }) {
          const dbUser = await prisma.user.findFirst({
            where : {
                email : token.email
            }
            
          });
    
          if (!dbUser) {
            throw new Error("no user with email found");
          }
    
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          };
        },
        async session({ token, session }) {
          if (token) {
            session.user     = {
                id : token.id as string,
                name : token.name,
                email : token.email,
                image : token.picture

            }
          }
    
          return session;
        },
      },
    } satisfies AuthOptions;

export function getSession(){
    return getServerSession(authConfig)
}