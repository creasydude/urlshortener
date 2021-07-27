import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//Import Routes
import urlRouter from './routes/urlRouter.js';
import NotFound from './routes/404.js';

// Dependencies
const app = express();
dotenv.config();

//Middlewares
app.use(bodyParser.json());
app.use('/api', urlRouter);
app.use('*', NotFound);


// Listen + MongoDb Setup
await mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


app.listen(process.env.PORT, () => {
    console.log(`Server Is Running On Port : ${process.env.PORT}`)
});