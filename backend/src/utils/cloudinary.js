import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
}); 

export const uploadToCloudinary = async (localFilePath) => {
    try {
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: 'product', // Organize files in a folder (optional)
      });
  
      // Delete the temporary file after upload
      fs.unlinkSync(localFilePath);
  
      return result.secure_url; // Cloudinary image URL
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };
  