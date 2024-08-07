import jwt from 'jsonwebtoken'

export const auth = (req,res,next) => {
    try{
        const token = req.header("Authorization")
        console.log(token)
        if(!token) return res.status(400).json({msg:"Invalid Authentication"})

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg:"Invalid Authentication"})

            req.user = user
            next()
            
        })
        // console.log("auth executed successfully")
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}

