import { Router } from "express";
import { createProduct } from "../controllers/products.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadSingleFile } from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.post('/create',uploadSingleFile ,verifyJWT, createProduct);

export default productRouter