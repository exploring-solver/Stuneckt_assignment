// const config = require('../../../config');
const Post = require('../models/mongoose');

const createPost = async (req, res) => {
    try {
        // Assuming req.user contains the authenticated user's information including the user ID
        const { textContent, media } = req.body;
        const newPost = Post({
            user: req.user.id, // Assuming req.user.id is the user ID
            textContent,
            media,
        });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};


module.exports = { createPost };
