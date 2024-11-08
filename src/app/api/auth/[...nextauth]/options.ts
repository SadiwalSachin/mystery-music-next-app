// ham user ko sign in karane wale hai isme credentials se email/username , password se

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // credentials se login hai iske liye id credentials hai
      // id or name mostly same likha jata hai
      // ye id or name itne inportant parameter bhi nahi hai
      id: "credentials",
      name: "Credentials",
      
      // inse behind the scene nextauth ek html form banayega jaha hame email or username wali field dikhegi

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },


      // ye custom async method hai jiske andar customize login ka code likh rahe hai
      // hame ye async authorize method ka hi use karna padega 
      // ye authorize method credentials parameter accept karta hai

      async authorize(credentials: any): Promise<any> {
        
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier.email },
              { username: credentials.identifier.username },
            ],
          });

          // if user nahi to error throw kar do
          if (!user) {
            throw new Error("No User Found With This Email");
          }

          // ye custom credentials hai login hai kyunki hame check karna jaruri hai ki user verified hai ya nahi kyunki google ya other login me ham ye nahi kar sakte 
          
          if (!user.isVerified) {
            throw new Error("Please Verify Your Account First Before Login");
          }

          // ab finally user verified bhi hai to password match kara rahe hai
          // yaha password ka access esse hi milta hai credentials.password se se identifier se nahi milta

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            // user return hone ke baad controll credentials or auth option se pass chala jata hai
            return user;
          } else {
            throw new Error("Incorect Password / Invaldi Credentials");
          }
        } catch (err: any) {
          // hame yaha par error throw karna jaruri hai kyunki ye jo documentation me authorize method hai isme aap ya null return kijiye null return karne se next auth apne aap error display kar dega jo karna chaiye or ya to error return kijiye 
          throw new Error(err);
        }
      },
    }),
  ],

  callbacks:{
    // ab hame token ko powerfull banyenge matlab or data inject karenge
    // ye jwt me user jo aaya hai vo provider me jo user return kiya hai vo hai ye
    async jwt({ token, user}) {
      // hamne jo token me user ki or values daali hai vo normally nahi daal sakte hai kyunki user ka type define hoata hai kyunki ye normal user next auth ka user hota hai jisme jyada chijo ka access nahi milta  to user ko modify karne ke liye hamne jo types folder banaya hai us folder me ham ek or file banyaenge jiske andar ham user ke type ko modify karenge to us types me ham nextauth.d.ts name ki file banyenge
        if(user){
            token._id = user._id?.toString()
            token.isVerified = user.isVerified
            token.isAcceptingMessage = user.isAcceptingMessage
            token.username = user.username
        }
        return token
      },
    async session({ session, token }) {
        if(token){
            session.user._id = token._id?.toString()
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessage = token.isAcceptingMessage
            session.user.username = token.username
        }
        return session
      }
  },

  pages: {
    signIn: "/sign-in",
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
};
