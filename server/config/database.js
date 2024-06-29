import mongoose from "mongoose";


const dbConnection =  async ()=>{

try {
   await mongoose.connect(process.env.MONGODB_URI,{});      
   console.log("Server connected to database successfully...📅");   
} catch (error) {
    console.log(error);
};

};

export default dbConnection;