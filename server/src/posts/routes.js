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
        controller.createPost(res, req.body);
    }
);

//TODO : get all posts

//TODO : get all for existing user

//TODO : delete post

//TODO : update post

module.exports = router;
