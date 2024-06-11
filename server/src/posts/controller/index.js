// const config = require('../../../config');
const Post = require('../models/mongoose');
const Schema = require('../../users/models/mongoose');
const User = require('../../users/models/mongoose');

// Controller: create a post
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

const getAllPosts = async (req, res) => {
  console.log('Received request to get all posts');
  const { page = 1, limit = 10 } = req.query;

  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      populate: {
        path: 'user', // Populate the 'user' field with the 'User' document
        select: 'username', // Only include the 'username' field
      },
      select: '-__v', // Exclude the '__v' field from the query
    };

    const result = await Post.paginate({}, options);
    const postsWithUsername = result.docs.map(post => ({
      ...post.toJSON(),
      user: post.user.username, // Replace the user object with the username
    }));
    result.docs = postsWithUsername;

    res.status(200).json({ message: 'Posts retrieved successfully', result });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Failed to retrieve posts', error: error.message });
  }
};

module.exports = getAllPosts;



// Controller: get all for existing user
const getPostsForCurrUser = async (req, res) => {
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

// Controller: delete post
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

// Controller : update post
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

//Controller: Get a user's posts using their id

const getUserPosts = async (req, res) => {

  const username = req.params.id;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id;
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await Post.paginate({ user: userId }, options);
    res.status(200).json({
      message: 'User posts retrieved successfully',
      posts: result.docs,
      pagination: {
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        nextPage: result.nextPage,
        prevPage: result.prevPage,
      },
    });
  } catch (error) {
    console.error('Error retrieving user posts:', error);
    res.status(500).json({
      message: 'Failed to retrieve user posts',
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsForCurrUser,
  deletePost,
  updatePost,
  getUserPosts
};
