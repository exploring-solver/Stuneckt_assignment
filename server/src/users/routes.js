const express = require('express');

const controller = require('./controller/index');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemasValidation');
const validateAuth = require('../../middlewares/validateAuth');

const router = express.Router();

router.post(
  '/api/v1/signup',
  validateSchemas.inputs(schemas.signUp, 'body'),
  (req, res) => {
    controller.signUp(res, req.body);
  }
);

// API : Login router
router.post(
  '/api/v1/login',
  validateSchemas.inputs(schemas.login, 'body'),
  (req, res) => {
    controller.login(res, req.body);
  }
);

// API : User Details router
router.get(
  '/api/v1/user/details',
  validateAuth.checkIfAuthenticated,
  (req, res) => {
    // Use req.user to access the authenticated user's information
    res.json({ user: req.user });
  }
);

// API: Mock users
router.post(
  '/create-mock-users',
  validateAuth.checkIfAuthenticated,
  async (req, res) => {
    try {
      await controller.createMockUsers(10); // Number of users to create
      res.status(200).json({ message: 'Mock users created successfully' });
    } catch (error) {
      console.error('Error creating mock users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// TODO : Update Details

module.exports = router;
