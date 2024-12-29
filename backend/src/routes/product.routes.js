import { Router } from "express";
import { createProduct  , updateProduct, deleteProduct, allProduct , getProductById, getProductByCategory } from "../controllers/products.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadSingleFile } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.post('/create',verifyJWT, uploadSingleFile , createProduct);
productRouter.get('/productId', verifyJWT, getProductById);
productRouter.get('/category', verifyJWT, getProductByCategory);
productRouter.get('/allproducts', verifyJWT, allProduct);
productRouter.put('/update/productId', verifyJWT, updateProduct);
productRouter.delete('/delete/productId', verifyJWT, deleteProduct);

export default productRouter