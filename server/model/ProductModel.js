const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewShema = new Schema({
    name : {type : String, required : true},
    rating : {type : Number, required : true},
    comment : {type : String, required : true},
    user : {
        type : Schema.Types.ObjectId,
        rrequired : true,
        ref : "User",
    }
});

const ProductShema = new Schema({
    name : {
        type: String,
        required : true, 
    },
    image : {
        type : String,
        required : true,
    },
    brand : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true,
    },
    review : [reviewShema],
    rating :{
        type : Number,
        required : true,
        default : 0,
    },
    price :{
        type : Number,
        required : true,
        default :0,
    }, 
    countInStock :{
        type : Number,
        required : true,
        default : 0,
    },
    user :{
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model('Product', ProductShema);
