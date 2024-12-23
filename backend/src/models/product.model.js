import mongoose ,{Schema } from "mongoose";

const productSchema = new Schema({
        name: {
            type : String,
            required : true,
            trim: true ,
            lowercase : true ,
        },
        price:{
            type: Number , 
            required : true ,
        },
        image:{
            type:String ,
            require : true ,
        },
        description:{
            type:String ,
            required : true ,      
        },
        category:{
            type:String ,
            required : true , 
        }

})
export const Product = mongoose.model('Product', productSchema);


