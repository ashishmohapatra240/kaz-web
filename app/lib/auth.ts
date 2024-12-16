import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (credentials?.email === process.env.ADMIN_EMAIL &&
                    credentials?.password === process.env.ADMIN_PASSWORD) {
                    return {
                        id: "1",
                        email: process.env.ADMIN_EMAIL,
                        name: "Admin",
                        role: "admin"
                    };
                }
                return null;
            },
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
}; 