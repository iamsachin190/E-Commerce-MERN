import { Order } from "../models/order.model.js";
import {apiResponse} from "../utils/apiResponse.js"
import { Product } from "../models/product.model.js";

const createOrder = async (req, res) => {

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

    // get order by id 

    
const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try{
     const order = await Order.findById(orderId)

     if(!order){
        return res.status(404).json(new apiResponse(404, null, "Order not found"))
     }

     return res.status(200).json(new apiResponse(200, order, "Order found"))

  }
  catch(error){
     console.log("enternel server error while fatching Order by id " , error)
  }
}


    // get all oder (admin)

    const allOrder = async (req, res) => {
      try{
         const order = await Order.find()
   
         if(order.length === 0){
            return res.status(404).json(new apiResponse(404, null, "No order found"))
         }
   
         return res.status(200).json(new apiResponse(200, order, "All order"))
   
      }
      catch(error){
          console.log("enternel server error while fatching order " , error)
      }
   }
   


    // update order status

    const orderStatusUpdate = async (req, res) =>{
      const orderId = req.params.id;
      const status = req.body.status;

      if(!orderId || !status){
        return res.status(400).json(new apiResponse(400, null, "Order id and status are required"))
      }

      const order = await Order.findById(orderId)

      if(!order){
        return res.status(404).json(new apiResponse(404, null, "Order not found "))
      }

      const  updatedOrderStatus = order.status = status ; 

      if(!updatedOrderStatus){
        return res.status(400).json(new apiResponse(400, null, "Order status not updates "))
      }

      return res.status(200).json(new apiResponse(200, order, "Order status updated "))

    }

    // delete order

    const deleteOrder = async (req, res) => {
      const orderId = req.params.id;
   
      if(!orderId){
          return res.status(400).json(  400, null,  "Please provide Order id")
         }
      
     try {
   
         const deletedOrder = await Order.findByIdAndDelete(orderId);
   
         if(!deletedOrder){
            return res.status(404).json(new apiResponse(404, null, "Order not found"))
         }
   
         return res.status(200).json(new apiResponse(200, null, "Order deleted successfully"))

     } catch (error) {
      console.log("enternel server error ",  error )
     }
      
   
   }
   



export { deleteOrder, orderStatusUpdate, allOrder, createOrder, getOrderById }

