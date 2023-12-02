import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products:[ {
        type: mongoose.ObjectId,
        ref:"Products"
    }],  
    payments: { 
    },
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    status:{
        type:String,
        default:"Not process",
        enum:["Not Process", "Processing","shipped","delivered","cancel" ],
    }
});

export default mongoose.model("order", orderSchema);