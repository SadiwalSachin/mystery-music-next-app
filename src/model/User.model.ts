import mongoose ,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string,
    createdAt:Date
} // ye hamne ab hamare document ko update karke ek custom data type bana liya hai , ye hame structure bhi batata hai

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

// MessageSchema: Schema<Message> is line ka matlab hai ki ye jo MessageSchema hai ye ek Schema ko follow karega ya fir iska type jo hai vo ek Schema type hai or vo Schema me bhi konse Schema ko follow karega to vo Message Schema ko follow karega 

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
}

const userSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        match:[/.+\@.+\..+/,"please use a valid email address"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})

// because next edge time par run karti hai isliye pehle ham check karenge ki model pehle se to exist nahi karta hai
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema) 

export default UserModel;

// mongoose me pure user ka validation hai ek individual ka nahi hai jese ki login ke time par jo details aa rahi hai unka validation signuup ke time par jo detials aa rahi hai unka validation , yw sab me zod help karta hai . monogoose pur user ko validate karta hai jab user create hota hai tab individual validation ke liye zod ka user karenege zod manula validation hata deta hai 