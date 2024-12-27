import { app } from "./app.js"; 
import {connectDB} from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})
connectDB().then(() => {
    app.listen(8000, ()=>{
        console.log("App is running on post 8080 ")
    })
})
