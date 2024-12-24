import { Order } from "../models/order.model";
import apiResponse from "../utils/apiResponse.js"
import { Product } from "../models/product.model.js";

const createOrder = async (req, res)=>{

    const { userId , products } = req.body 

    if(!userId || !products){
        return new apiResponse(400, null , "user and product required ")
    }
    
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json(apiResponse(404, null, "Product not found"));
      }
      totalPrice += product.price * item.quantity;
    }

    const createdOrder = await Order.create({
    userId,
    products,
    totalPrice,
    })

    if(!createdOrder){
         new apiResponse(401 , null , "order creation failed ")
    }

    return res.status(200).json(
        new apiResponse(200, createOrder, 'order created successfully ')
    )  
} 

