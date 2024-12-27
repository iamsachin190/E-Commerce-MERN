import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { createOrder, getOrderById, allOrder, orderStatusUpdate, deleteOrder } from "../controllers/order.controller.js";


const orderRouter = Router();

orderRouter.post('/create', verifyJWT, createOrder);
orderRouter.get('/getall', verifyJWT, allOrder);
orderRouter.get('/getbyid/:id', verifyJWT, getOrderById);
orderRouter.put('/update/:id', verifyJWT, orderStatusUpdate);
orderRouter.delete('/delete/:id', verifyJWT, deleteOrder);

export default  orderRouter;



