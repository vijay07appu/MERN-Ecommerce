import {Product} from "../models/productModel.js"

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

            const {product_id,title,price,description,content,images,category}=req.body
            // if(!images) return res.status(400).json({msg:"No image Upload"})

            const product=await Product.findOne({product_id})
            if(product) return res.status(400).json({msg:"This product already exists"})

            const newProduct =new Product({product_id,title:title.toLowerCase(),price,description,content,images,category})
            await newProduct.save()

            res.json(newProduct)

        }catch(err){
            return res.status(500).json({msg:err.message})

        }

    },

    deleteProduct:async(req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    },

    updateProduct:async(req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    }
}