// const config = require('../../../config');
const Schema = require('../../users/models/mongoose')

// Follow a user by user ID
const followUser = async (req, res) => {
    const { username } = req.params;

    const { fUsername} = req.body;

    try {
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const follower = await Schema.User.findOne({ fUsername });
        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        const userId = user._id;
        const followerId = user._id;
        await Schema.User.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } });
        await Schema.User.findByIdAndUpdate(followerId, { $addToSet: { following: userId } });

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Failed to follow user', error: error.message });
    }
};

// Unfollow a user by user ID
const unfollowUser = async (req, res) => {
    const { username } = req.params;

    const { fUsername} = req.body;

    try {
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const follower = await Schema.User.findOne({ fUsername });
        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        const userId = user._id;
        const followerId = user._id;
        await Schema.User.findByIdAndUpdate(userId, { $pull: { followers: followerId } });
        await Schema.User.findByIdAndUpdate(followerId, { $pull: { following: userId } });

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
    }
};

// Get total followers and following users of a user
const getTotalFollowersFollowing = async (req, res) => {
    const { username } = req.params;

    const { fUsername} = req.body;

    try {
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const follower = await Schema.User.findOne({ fUsername });
        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        const totalFollowers = user.followers.length;
        const totalFollowing = user.following.length;

        res.status(200).json({ totalFollowers, totalFollowing });
    } catch (error) {
        console.error('Error getting total followers and following:', error);
        res.status(500).json({ message: 'Failed to get total followers and following', error: error.message });
    }
};


module.exports = {
    followUser,
    unfollowUser,
    getTotalFollowersFollowing,
};
