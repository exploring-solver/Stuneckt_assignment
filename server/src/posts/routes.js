const express = require('express');
const controller = require('./controller/index');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemasValidation');
const validateAuth = require('../../middlewares/validateAuth');

const router = express.Router();

router.post(
  '/api/v1/posts',
  validateAuth.checkIfAuthenticated,
  validateSchemas.inputs(schemas.post, 'body'),
  (req, res) => {
    console.log('Received request to create a post');
    // console.log('User:', req.user); // Assuming req.user contains user information
    controller.createPost(req, res);
  }
);

router.get('/api/v1/posts', validateAuth.checkIfAuthenticated, (req, res) => {
  console.log('Received request to get all posts');
  controller.getAllPosts(req, res);
});

router.get(
  '/api/v1/posts/user',
  validateAuth.checkIfAuthenticated,
  (req, res) => {
    console.log('Received request to get all posts for existing user');
    // console.log('User:', req.user); // Assuming req.user contains user information
    controller.getPostsForCurrUser(req, res);
  }
);

router.delete(
  '/api/v1/posts/:id',
  validateAuth.checkIfAuthenticated,
  (req, res) => {
    console.log('Received request to delete post');
    // console.log('User:', req.user); // Assuming req.user contains user information
    controller.deletePost(req, res);
  }
);

router.put(
  '/api/v1/posts/:id',
  validateAuth.checkIfAuthenticated,
  validateSchemas.inputs(schemas.post, 'body'),
  (req, res) => {
    console.log('Received request to update post');
    // console.log('User:', req.user); // Assuming req.user contains user information
    controller.updatePost(req, res);
  }
);

router.get(
  '/api/v1/posts/user/:id',
  validateAuth.checkIfAuthenticated,
  (req, res) => {
    console.log('Received request to get a particular user\'s posts');
    // console.log('User:', req.user); // Assuming req.user contains user information
    controller.getUserPosts(req, res);
  }
);


module.exports = router;
