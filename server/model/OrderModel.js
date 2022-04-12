const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderShema = new Schema ({
    orderItems :[
        {
            name : {
                type : String,
                required : true,
            },
            quantity : {type : Number, required : true},
            image : {type : String, required : true,},
            price : {type : Number, required : true,},
            product : {
                type : Schema.Types.ObjectId,
                ref : 'Product',
                required : true,
            },
        },
    ],
   
    shippingAddress : {
        address : {type : String, required : true},
        city : {type : String, required : true },
        country : {type : String, required : true},
    },
    paymentMethod : {
        type :String,
        required : true,
    },
    taxPrice :{
        type : Number,
        required : true,
        default : 0.0,
    },
    shippingPrice : {
        type: Number,
        required :true,
        default : 0.0,
    },
    totalPrice : {
        type : Number,
        required : true,
        default : 0.0,
    },
    isPaid : {
        type : Boolean,
        required : true,
        default : false,
    },
    paidAt :{
        type : Date,
    },
    isDelivered :{
        type : Boolean,
        require : true,
        default : false,
    },
    deliveredAt : {
        type : Date,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
});

module.exports = mongoose.model('Order', OrderShema);

