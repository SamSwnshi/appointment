import jwt from "jsonwebtoken";

export const auth = async(req,res,next) =>{
    const token = req.header("Authorization")?.split(" ");

    if(!token){
        return res.status(401).json({message: "Access Denied!, NO Token Provided"})
    }
    try {
        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token'})
    }
}