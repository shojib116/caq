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
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
