import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('{ Add your mongodb URI Here }').then(()=>console.log("DB Connected"));
   
}
