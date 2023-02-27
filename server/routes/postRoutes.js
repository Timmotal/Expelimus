import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongoDB/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route('/').get(async(req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts });
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// CREATE A POST
router.route('/').post(async(req, res) => {
    try {
        const { name, prompt, photo } = req.body; // destructured from frontend, we are sending from the frontend. where we get the entire post
    const photoUrl = await cloudinary.uploader.upload(photo); //upload photo url to cloudinary, we then get cloudinary optimized URL

    const newPost =  await Post.create({
        // this will create a new post in our database
        name,
        prompt,
        photo: photoUrl.url,
    });

    res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
});

export default router;