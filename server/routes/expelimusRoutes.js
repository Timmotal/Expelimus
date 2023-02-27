import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);
// we made an instance of openai

router.route('/').get((req, res) => {
    res.send('Kiki do you love me');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body //coming from our frontend side, the prompt we created

        const aiResponse = await openai.createImage({ // we await the image as a response from the api
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image }); // we are sending it back to the frontend
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error?.response?.data?.error.message);
    }
})

export default router;