import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://pritamsamantara990:<db_password>@cluster0.8msxofk.mongodb.net/?appName=Cluster0').then(()=>console.log("DB Connected"));

}


