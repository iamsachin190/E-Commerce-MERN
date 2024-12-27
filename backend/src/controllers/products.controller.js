import { Product } from "../models/product.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
   try {
       console.log("Request Body:", req.body);
       console.log("Uploaded File:", req.file);

       const { name, price, description, category } = req.body;

       // Validate input fields
       if ([name, price, description, category].some((field) => field?.trim() === "")) {
           console.log("Validation Failed: Missing required fields.");
           return res.status(400).json(new apiResponse(400, null, "Please fill all the fields"));
       }

       // Verify uploaded file
       if (!req.file) {
           console.log("Validation Failed: No file uploaded.");
           return res.status(400).json(new apiResponse(400, null, "File upload failed"));
       }

       // Get the local path of the uploaded file
       const productImageLocalPath = req.file.path;
       console.log("File Path for Upload:", productImageLocalPath);

       // Upload the file to Cloudinary
       const ProductImageUrl = await uploadOnCloudinary(productImageLocalPath);
       console.log("Cloudinary URL:", ProductImageUrl);

       // Create the product in the database
       const product = await Product.create({
           name,
           price,
           description,
           category,
           image: ProductImageUrl,
       });
       console.log("Created Product:", product);

       const CreatedProduct = await Product.findById(product._id);
       console.log("Retrieved Product:", CreatedProduct);

       if (!CreatedProduct) {
           console.log("Failed to retrieve created product.");
           return res.status(500).json(new apiResponse(500, null, "Failed to create product"));
       }

       return res.status(201).json(new apiResponse(201, CreatedProduct, "Product created successfully"));
   } catch (error) {
       console.error("Error:", error.message);
       return res.status(500).json(new apiResponse(500, null, "Internal server error"));
   }
};


// product update

const updateProduct = async (req, res) => {
   const productId = req.params.id;

   // Check if product ID is provided
   if (!productId) {
      return res.status(400).json({ status: 400, message: "Please provide product id" });
   }

   try {
      // Fetch the existing product
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
         return res.status(404).json({ status: 404, message: "Product not found" });
      }

      // Update only the fields provided by the user
      const { name, price, description } = req.body;

      if (name) existingProduct.name = name;
      if (price) existingProduct.price = price;
      if (description) existingProduct.description = description;

      // Save the updated product back to the database
      const updatedProduct = await existingProduct.save();

      return res.status(200).json({ 
         status: 200, 
         message: "Product updated successfully", 
         data: updatedProduct 
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Internal server error" });
   }
};



// product delete

const deleteProduct = async (req, res) => {
   const productId = req.params.id;

   if(!productId){
       return res.status(400).json(  400, null,  "Please provide product id")
      }
   
  try {

      const deletedProduct = await Product.findByIdAndDelete(productId);

      if(!deletedProduct){
         return res.status(404).json(new apiResponse(404, null, "Product not found"))
      }

      return res.status(200).json(new apiResponse(200, null, "Product deleted successfully"))


  } catch (error) {
   console.log("enternel server error ",  error )
  }
   

}

// get all product 

const allProduct = async (req, res) => {
   try{
      const products = await Product.find()

      if(products.length === 0){
         return res.status(404).json(new apiResponse(404, null, "No products found"))
      }

      return res.status(200).json(new apiResponse(200, products, "All products"))

   }
   catch(error){
       console.log("enternel server error while fatching product " , error)
   }
}

// get product by id 

const getProductById = async (req, res) => {
   const productId = req.params.id;
   try{
      const product = await Product.findById(productId)

      if(!product){
         return res.status(404).json(new apiResponse(404, null, "Product not found"))
      }

      return res.status(200).json(new apiResponse(200, product, "Product found"))

   }
   catch(error){
      console.log("enternel server error while fatching product by id " , error)
   }
}

// get product by category
const getProductByCategory = async (req, res) => {
   const category = req.params.category;
   try{
      const products = await Product.find({category: category})
      if(products.length === 0){
         return res.status(404).json(new apiResponse(404, null, "No products found"))
      }
      return res.status(200).json(new apiResponse(200, products, "All products"))
   }
   catch(error){
      console.log("enternel server error while fatching product by category " , error)
   }
}


export { createProduct, getProductByCategory, getProductById, allProduct, deleteProduct, updateProduct } 




