import { Product } from "../models/product.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createProduct = async (req, res ) =>{
   
        const { name, price, description } = req.body;

        if ([name, price, description].some((field) => field?.trim() === "")) {
            return res.status(400).json(apiResponse(400, null, "Please fill all the fields"));
          }

     let productImageLocalPath = req.file.path; 
     console.log(productImageLocalPath) 
       
     const ProductImageUrl = await uploadOnCloudinary(productImageLocalPath)

     const product = await Product.create({
        name,
        price,
        description,
        image: ProductImageUrl 
     })

     const CreatedProduct = await Product.findByid(product._id)

     if(!createProduct){
        throw new apiResponse(500, null, "Failed to create product")
     }

    return res.status(201).json(apiResponse(201, CreatedProduct, "Product created successfully"))
       
}

export { createProduct } 




