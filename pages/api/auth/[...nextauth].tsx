import NextAuth from "next-auth";

import "firebase/firestore";
import { app } from "@/helpers/db-config";
import { NextApiRequest, NextApiResponse } from "next";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        token: { type: "text" },
      },
      async authorize(credentials: any) {
        const user = {
          id: "",
          token: credentials.token,
        };
        return Promise.resolve(user);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter(app),
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return { token, user, account, profile, isNewUser };
    },

    async session({ session, token }) {
      return { ...session, token: token.token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}) as (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
