import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req,res) =>{

    //let image_filename = `${req.file.filename}`;
    let image_filename =`${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
   try{
    await food.save();
    res.json({success:true,message:"Food Added"})
   } catch(error){
    console.log(error)
    res.json({success:false,message:"Error",error})
   }


}

// all food list

const listFood = async (req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async (req,res) => {
   try{
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})


    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
   }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})

   }
}


export {addFood,listFood,removeFood}

// import foodModel from "../models/foodModel.js";

// const addFood = async (req, res) => {
//   try {
//     if (!req.file || !req.body.name || !req.body.description || !req.body.price || !req.body.category) {
//       return res.status(400).json({ success: false, message: "All fields including image are required" });
//     }

//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: parseFloat(req.body.price), // ensure number
//       category: req.body.category,
//       image: req.file.filename
//     });

//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (err) {
//     console.error("Error while saving food:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export { addFood };
