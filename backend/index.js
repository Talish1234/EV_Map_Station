const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouters = require('./routes/authRoute');
const chargerRouters = require('./routes/chargerRouter');
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors({
    origin: process.env.BASE_URL, 
    credentials: true,
}));
connectDB(process.env.MONGO_URL);

app.use(cookieParser());
app.use(express.json());

app.use('/auth',authRouters);
app.use('/charger',chargerRouters);

app.listen(3000, () => {
    console.log('Server is running on port',PORT);
});