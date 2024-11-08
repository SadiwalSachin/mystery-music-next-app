import { Message } from "@/model/User.model"

export interface ApiResponse{
    success:boolean,
    message:string,
    isAcceptingMeessages?:boolean,
    messages?:Array<Message>
}