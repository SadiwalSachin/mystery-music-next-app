import "next-auth"
import { DefaultSession } from "next-auth";

// ham yaha user ko modify kar rahe hai
declare module "next-auth" {
    interface User{
        _id?:string;
        isVerified?:boolean,
        isAcceptingMessage?:boolean,
        username?:string
    }
    interface Session {
        user:{
            _id?:string;
            isVerified?:boolean,
            isAcceptingMessage?:boolean,
            username?:string
        } & DefaultSession["user"] // yaha par default sessoin me user name ki key inject kar rahe hai
    }
} 

declare module "next-auth/jwt" {
    interface JWT {
        _id?:string;
        isVerified?:boolean,
        isAcceptingMessage?:boolean,
        username?:string
    }
}