const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const FRONTEND_URL = process.env.FRONTEND_URL;

// Load env vars
dotenv.config();

const app = express();
//Cors Handling
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(cors({origin:FRONTEND_URL, credentials:true}));
app.use(express.json());

// Example route
app.get('/', (req, res) => res.send('API is running...'));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
}).catch(err => console.log(err));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);
