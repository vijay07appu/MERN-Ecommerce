import {Product} from "../models/productModel.js"
import { uploadOnCloudinary } from "../middleware/cloudinaryConfig.js"

export const productCtrl={
    getProduct:async(req,res)=>{
        try{

            const products=await Product.find()
            res.json({products})
             

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
            
    },
    

    createProduct:async(req,res)=>{
        try{

            const {product_id,title,price,description,content,category}=req.body

            const imageLocalPath=req.files?.images[0]?.path;

            if(!imageLocalPath)
                {
                   return res.json({msg:"Image local path is required "})
                }
                const image=await uploadOnCloudinary(imageLocalPath)
                console.log(image)

                if(!image)
                {
                     return res.json("image not uploaded on cloudinary")
                }

            const product=await Product.findOne({product_id})
            if(product) return res.status(400).json({msg:"This product already exists"})

            const newProduct =new Product({product_id,title:title.toLowerCase(),price,description,content,images:image.url,category})
            await newProduct.save()

            res.json(newProduct)

        }catch(err){
            return res.status(500).json({msg:err.message})

        }

    },

    deleteProduct:async(req,res)=>{
        try{


            const product=await Product.findByIdAndDelete({_id:req.params.id})
            res.json("Product deleted successfully")

        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    },

    updateProduct:async(req,res)=>{
        try{

            const {product_id,title,price,description,content,category}=req.body

            const imageLocalPath=req.files?.images[0]?.path;

            if(!imageLocalPath)
                {
                   return res.json({msg:"Image local path is required "})
                }
                const image=await uploadOnCloudinary(imageLocalPath)
                console.log(image)

                if(!image)
                {
                     return res.json("image not uploaded on cloudinary")
                }

            await Product.findByIdAndUpdate({_id:req.params.id},{product_id,title,price,description,content,images:image.url,category})
            res.json("Product  updated successfully")
           

        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    }
}