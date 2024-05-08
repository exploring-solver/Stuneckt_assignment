// const config = require('../../../config');
const Post = require('../models/mongoose');

const createPost = async (req, res) => {
  console.log('Received request to create post');
  console.log('User ID:', req.user);
  try {
    // Assuming req.user contains the authenticated user's information including the user ID
    const { textContent, media } = req.body;
    console.log('Received text content:', textContent);
    console.log('Received media:', media);
    const newPost = Post({
      user: req.user.id,
      textContent,
      media,
    });
    await newPost.save();
    console.log('Post saved successfully');
    res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res
      .status(500)
      .json({ message: 'Failed to create post', error: error.message });
  }
};

module.exports = { createPost };
