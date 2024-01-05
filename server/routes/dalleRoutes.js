import express from "express";
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const dalleRoutes = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

dalleRoutes.route('/').get((req, res) => {
    console.log("reached");
    res.send("Hello from DALL-E !")
})

dalleRoutes.route('/').post( async (req, res) => {
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;
        console.log(image);

        res.status(200).json({
            photo : image
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


export default dalleRoutes;
