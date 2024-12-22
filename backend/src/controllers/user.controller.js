
import {User } from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js";



const registerUser = async (req , res) => {
    const {name, email, password, role} = req.body 

    if ([name, email, password, role].some((field) => field?.trim()==="")){
           return apiResponse(400, null,  "Please fill all the fields")
    }

    const existingUser = await User.findOne({email})
    if (existingUser) {
        throw new Error("Email already exists")
    }

    const user = await User.create({
        name, 
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiResponse(500 , null , "Somethong went wrong while registering user ")
    }
    return res.status(201).json(
        new apiResponse(200, createdUser, "User Registered Successfully")
    )
}

const loginUser = async (req, res) => {
  const {email, password} = req.body ; 

  if(!email){
    return apiResponse(400, null, "Please fill email")
  }

  const user = await User.findOne({email})

  if(!user){
    return apiResponse(400, null, "Invalid email or password")
  }

  const isValidPassword = await user.isPasswordCorret(password)

  if(!isValidPassword){
    throw new apiResponse(400, null, "Invalid  password")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true 
  }

  return res
  .status(200)
  .cookie("refreshToken", refreshToken, options)
  .cookie("accessToken",accessToken, options)
  .json(
    new apiResponse(200, 
        {
        loggedInUser, 
        accessToken,
        refreshToken
        },
        "User logged in successfully")
  )}

  export {registerUser, loginUser}