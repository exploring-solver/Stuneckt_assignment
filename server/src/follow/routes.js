const express = require('express');
const controller = require('./controller/index');
// const validateSchemas = require('../../middlewares/validateSchemas');
const validateAuth = require('../../middlewares/validateAuth');

const router = express.Router();

router.post('/follow/:username',
    validateAuth.checkIfAuthenticated,
    // validateSchemas.inputs(schemas.follow, 'body'),
    (req, res) => {
        controller.followUser(req, res);
    }
);

router.delete('/unfollow/:username',
    validateAuth.checkIfAuthenticated,
    // validateSchemas.inputs(schemas.unfollow, 'body'),
    function (req, res) {
        controller.unfollowUser(req, res);
    }
);

router.get('/followers/:username',
    validateAuth.checkIfAuthenticated,
    function (req, res) {
        controller.getTotalFollowersFollowing(req, res);
    }
);

module.exports = router;
