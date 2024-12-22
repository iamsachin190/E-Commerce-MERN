import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

export const verifyJWT = async (req, res, next) => {
    try{
        const token = req.cookies?.accessToken ||req.header('Authorization').replace('Bearer ', '');
        if(!token) return res.status(401).json({message: 'Unauthorized'});
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password -refreshToken")
        if(!user) return res.status(404).json({message: 'User not found'})
            req.user = user;
        next()
    }
    catch(err){
        throw new Error(err.message);
    }
}