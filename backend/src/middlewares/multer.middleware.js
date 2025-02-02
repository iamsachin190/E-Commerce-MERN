import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middleware for single file upload
const uploadSingleFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "product-images",
    });

    req.fileUrl = result.secure_url;
    fs.unlinkSync(filePath);
    next();
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ message: "File upload failed.", error: error.message });
  }
};

export const uploadSingle = upload.single("file");
export { uploadSingleFile };
