import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user?.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: { params: { scope: "read:user user:email" } },
          }),
        ]
      : []),
  ],
  callbacks: {
    // OAuth (Google/GitHub)-р анх удаа нэвтэрсэн хэрэглэгчийг DB-д
    // upsert хийнэ. Энэ нь Order.userId зэрэг гадаад түлхүүрийг алдаагүй
    // ажиллуулна. Credentials provider өөрөө DB-д шалгасан тул алгасна.
    async signIn({ user, account }) {
      if (!account || account.provider === "credentials") return true;

      // GitHub email private-р хадгалсан үед provider шууд өгөхгүй —
      // user:email scope-р api.github.com/user/emails-аас primary-г татна.
      let email = user.email;
      if (!email && account.provider === "github" && account.access_token) {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              Accept: "application/vnd.github+json",
            },
          });
          if (res.ok) {
            const emails: { email: string; primary: boolean; verified: boolean }[] = await res.json();
            const primary = emails.find((e) => e.primary && e.verified) ?? emails.find((e) => e.verified);
            email = primary?.email ?? null;
          }
        } catch (err) {
          console.error("[auth] failed to fetch github emails", err);
        }
      }

      if (!email) {
        console.error("[auth] sign-in failed: no email from", account.provider);
        return false;
      }

      const dbUser = await prisma.user.upsert({
        where: { email },
        update: {
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        },
        create: {
          email,
          name: user.name,
          image: user.image,
        },
      });
      // NextAuth `user`-т DB id-г суулгаснаар jwt callback зөв id ашиглана.
      (user as { id?: string; email?: string | null; role?: string }).id = dbUser.id;
      (user as { id?: string; email?: string | null; role?: string }).email = email;
      (user as { id?: string; email?: string | null; role?: string }).role = dbUser.role;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        const r = (user as { role?: "USER" | "ADMIN" }).role;
        token.role = r ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
