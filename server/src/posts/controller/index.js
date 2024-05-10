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

// TODO : get all posts
const getAllPosts = async (req, res) => {
  console.log('Received request to get all posts');
  try {
    const posts = await Post.find();
    res.status(200).json({ message: 'Posts retrieved successfully', posts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res
      .status(500)
      .json({ message: 'Failed to retrieve posts', error: error.message });
  }
};

// TODO : get all for existing user
const getPostsForUser = async (req, res) => {
  console.log('Received request to get posts for user');
  console.log('User ID:', req.user);
  try {
    const posts = await Post.find({ user: req.user.id });
    res
      .status(200)
      .json({ message: 'User posts retrieved successfully', posts });
  } catch (error) {
    console.error('Error retrieving user posts:', error);
    res
      .status(500)
      .json({ message: 'Failed to retrieve user posts', error: error.message });
  }
};

// TODO : delete post
const deletePost = async (req, res) => {
  console.log('Received request to delete post');
  const postId = req.params.id;
  try {
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res
      .status(500)
      .json({ message: 'Failed to delete post', error: error.message });
  }
};

// TODO : update post
const updatePost = async (req, res) => {
  console.log('Received request to update post');
  const postId = req.params.id;
  const { textContent, media } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { textContent, media },
      { new: true }
    );
    res
      .status(200)
      .json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res
      .status(500)
      .json({ message: 'Failed to update post', error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsForUser,
  deletePost,
  updatePost,
};
