import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import AuthRoutes from './routes/auth.js'
import BankerRoutes from './routes/banker.js';
import CustomerRoutes from './routes/customer.js';

dotenv.config({
    path: "./database/config.env"
})

export const app = express();

app.use(cors({
    origin: "https://bank-ten-black.vercel.app/",
    methods: ["GET, POST, PUT, DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/banker', BankerRoutes);
app.use('/api/v1/customer', CustomerRoutes);