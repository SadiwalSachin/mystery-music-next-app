import NextAuth from "next-auth/next";
import { authOptions } from "./options";


// ab hamko ek handler method banan hoga

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}