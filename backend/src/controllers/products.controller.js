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




