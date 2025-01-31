import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong while generating refresh and access tokens");
  }
};

const registerUser = async (req, res) => {
  console.log(req)
  const { name, email, password, role } = req.body;

  if ([name, email, password, role].some((field) => field?.trim() === "")) {
    return res.status(400).json(new apiResponse(400, null, "Please fill all the fields"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json(new apiResponse(400, null, "Email already exists"));
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return res.status(500).json(new apiResponse(500, null, "Something went wrong while registering user"));
  }

  return res.status(201).json(
    new apiResponse(200, createdUser, "User Registered Successfully")
  );
};

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json(new apiResponse(400, null, "Please fill email and password"));
//   }
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json(new apiResponse(400, null, "Invalid email or password"));
//     }

//     const isValidPassword = await user.isPasswordCorret(password);
//     if (!isValidPassword) {
//       return res.status(400).json(new apiResponse(400, null, "Invalid password"));
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//     const options = {
//       httpOnly: true,
//       secure: true,
//     };

//     return res
//       .status(200)
//       .cookie("refreshToken", refreshToken, options)
//       .cookie("accessToken", accessToken, options)
//       .json(
//         new apiResponse(200, 
//           {
//             loggedInUser, 
//             accessToken, 
//             refreshToken,
//           },
//           "User logged in successfully"
//         )
//       );
//   } catch (error) {
//     return res.status(500).json(new apiResponse(500, null, "Internal Server Error"));
//   }
// }
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json(new apiResponse(400, null, "Please fill email and password"));
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(new apiResponse(400, null, "Invalid email or password"));
    }

    // Validate password
    const isValidPassword = await user.isPasswordCorret(password); // Assuming your User model has isPasswordCorrect
    if (!isValidPassword) {
      return res.status(400).json(new apiResponse(400, null, "Invalid email or password")); // Avoid leaking info
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Exclude sensitive fields from the user object
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Set cookie options
    const cookieOptions = {
      httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Return response with cookies
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new apiResponse(200, {
          user: loggedInUser,
          accessToken,
        }, "User logged in successfully")
      );
  } catch (error) {
    console.error("Error in loginUser:", error.message); // Log error for debugging
    return res.status(500).json(new apiResponse(500, null, "Internal Server Error"));
  }
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true 
    }
  )
  const options = {
    httpOnly: true, 
    secure: true 
  }

  return res 
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, null, "User logged out successfully"));
}

const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, {
    name,
    email
  });

  if (!user) {
    return res.status(404).json(new apiResponse(404, null, "User not found"));
  }

  return res.status(200).json(new apiResponse(200, user, "User updated successfully"));
}

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return res.status(404).json(new apiResponse(404, null, "User not found"));
  }

  return res.status(200).json(new apiResponse(200, user, "User profile received successfully"));
}

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(404).json(new apiResponse(404, null, "Old password and new password are required"));
  }
  const user = await User.findById(req.user._id);

  const compareOldPassword = await user.isPasswordCorret(oldPassword);

  if (!compareOldPassword) {
    return res.status(404).json(new apiResponse(404, null, "Enter valid old password"));
  }

  user.password = newPassword; 

  return res.status(200).json(new apiResponse(200, user, "Password updated successfully"));
} 

export { registerUser, loginUser, logoutUser, updateProfile, getUserProfile, changePassword };
