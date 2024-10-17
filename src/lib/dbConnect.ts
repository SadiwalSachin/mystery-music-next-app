import mongoose from "mongoose";

// yaha bhi ham ts lagyenge ki jab database se connection aata hai to usme connection ke baad jo hame milta hai uska type kya hai or usme se hame kya kya chaiye 

// to hamne ek type define kiya hai jo ki ConnectionObject ke liye hai jiska type me hame isConnected milega vo bhi conform nahi hai isliye optional chaining ki hai
type ConnectionObject = {
   isConnected?:number 
}

const connection :ConnectionObject = {} // me isko initially empty isliye rakh paya hu ki isConnected optional hai agar optional nahi hota toerror aata

// void isliye use kiya ki muze parwah nahi hai ki Promise se kis tarah ka data aa raha hai
async function dbConnect() : Promise<void> {
    // initially checked ki databse connected to nahi hai
    if(connection.isConnected){
        console.log("Already connected to Database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")

        console.log("Db jo ki connection milta hai :- ", db);

        console.log("Db se jo connections me array milta hai vo :- ", db.connections);
        
        
        connection.isConnected = db.connections[0].readyState 

        console.log("DB Connectd Successfully");
        
    } catch (error) {
        
        console.log("DataBase Connection Failed",error);
        
        process.exit(1)
    }

}

export default dbConnect