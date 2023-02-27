import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongoDB/connect.js';
import postRoutes from './routes/postRoutes.js';
import expelimusRoutes from './routes/expelimusRoutes.js';

dotenv.config();
// this line allows us to pull out environment variables from our env files

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/expelimus', expelimusRoutes);
// essentialy we have created API endpoint that we can hook onto from our frontend 

app.get('/', async (req, res) => {
    res.send('Amigo como estas');
}) // to ensure that we know our application is running once we go to the url of our server

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer();