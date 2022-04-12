const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
// const uploadRouter = require('./router/uploadRouter');
const orderRouter = require('./router/orderRouter');


dotenv.config();
const app = express();
const PORT = process.env.PORT  || 5000;

app.use(cors({
    origin : '*',
    credentials:true,
}));
app.use(express.urlencoded());
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// app.get('/', (req, res) => res.send("hello word"));

const connectDB = async () => {
    try {
        
        await mongoose.connect(`mongodb+srv://tuananhday:1234@cluster0.6jvdn.mongodb.net/shop?retryWrites=true&w=majority`,{
                useNewUrlParser: true,
        });
    
        console.log('Connect Database successful');
    } catch (error) {
        console.log(error);
        console.log('Connect DB Failure');
        process.exit(1);
    };
};

connectDB();

app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter )

app.listen(PORT , () => console.log(`Server  run on port ${PORT}`));