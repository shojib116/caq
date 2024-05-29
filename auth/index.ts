import NextAuth, { User, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import Nodemailer from "next-auth/providers/nodemailer";
export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      name: "Magic Link",
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      if (existingUser) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string; // Ensure token.role is correctly typed
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
