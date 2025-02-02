// import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";

// export const verifyJWT = async (req, res, next) => {
//     try{
//         const token = req.cookies?.accessToken 
//         if(!token)
//             return res.status(401).json({message: 'Unauthorized access JWT varification failed '});

//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//         const user = await User.findById(decoded._id).select("-password -refreshToken")

//         if(!user) return res.status(404).json({message: 'User not found'})

//             req.user = user;
            
//         next()
//     }
//     catch(err){
//         throw new Error(err.message);
//     }
// }


export const verifyJWT = async (req, res, next) => {
    try {
      // Retrieve token from Authorization header
      const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
      if (!token) return res.status(401).json({ message: "Unauthorized access JWT verification failed" });
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Find user and attach to request object
      const user = await User.findById(decoded._id).select("-password -refreshToken");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      req.user = user;
  
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({ message: "Unauthorized access JWT verification failed" });
    }
  };
  