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
    console.log('User:', req.user); // Assuming req.user contains user information
    controller.createPost(req, res);
  }
);

// TODO : get all posts

// TODO : get all for existing user

// TODO : delete post

// TODO : update post

module.exports = router;
