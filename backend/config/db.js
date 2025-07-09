import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://pritamsamantara990:PRITAMnew@cluster0.8msxofk.mongodb.net/ResturantBot').then(()=>console.log("DB Connected"));

}

