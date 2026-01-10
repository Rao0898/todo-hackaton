import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// FINAL FIX: Direct Backend URL
const BACKEND_URL = "https://todo-hackaton-webapp.onrender.com";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Yahan process.env ki jagah direct URL use kiya hai
        const res = await fetch(`${BACKEND_URL}/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: credentials?.email || "",
            password: credentials?.password || "",
          }),
        });

        const data = await res.json();

        if (res.ok && data.access_token) {
          return {
            id: data.user_id,
            email: credentials?.email,
            accessToken: data.access_token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (user.accessToken) {
          token.accessToken = user.accessToken;
          token.id = user.id;
        }
      }

      if (account && account.provider === "google" && account.access_token) {
        // Yahan bhi direct URL use kiya hai
        const res = await fetch(`${BACKEND_URL}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: account.access_token }),
        });

        const data = await res.json();
        if (res.ok && data.access_token) {
          token.accessToken = data.access_token;
          token.id = data.user_id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);