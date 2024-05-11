// const config = require('../../../config');
const Schema = require('../../users/models/mongoose')

// Follow a user by user ID
const followUser = async (req, res) => {
    // console.log(req)
    const { username } = req.params;
    const fUsername  = req.user.username;

    try {
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const follower = await Schema.User.findOne({ username: fUsername });
        console.log(fUsername)
        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        const userId = user._id;
        const followerId = follower._id;

        await Schema.User.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } });
        await Schema.User.findByIdAndUpdate(followerId, { $addToSet: { following: userId } });

        console.log(`User '${username}' followed by '${fUsername}'`);
        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Failed to follow user', error: error.message });
    }
};


// Unfollow a user by user ID
const unfollowUser = async (req, res) => {
    const { username } = req.params;
    const fUsername = req.user.username;

    try {
        console.log(`Trying to unfollow user '${username}' by '${fUsername}'`);
        
        const user = await Schema.User.findOne({ username });
        if (!user) {
            console.log(`User '${username}' not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        const follower = await Schema.User.findOne({ username: fUsername });
        if (!follower) {
            console.log(`Follower '${fUsername}' not found`);
            return res.status(404).json({ message: 'Follower not found' });
        }

        const userId = user._id;
        const followerId = follower._id;
        await Schema.User.findByIdAndUpdate(userId, { $pull: { followers: followerId } });
        await Schema.User.findByIdAndUpdate(followerId, { $pull: { following: userId } });

        console.log(`User '${fUsername}' unfollowed user '${username}'`);
        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
    }
};


// Get total followers and following users of a user
const getTotalFollowersFollowing = async (req, res) => {
    const { username } = req.params;

    const { fUsername } = req.body;

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

// Get usernames of all followers of a user
const getAllFollowers = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const followers = await Schema.User.find({ _id: { $in: user.followers } }, 'username');
        const followerUsernames = followers.map(follower => follower.username);

        res.status(200).json({ followers: followerUsernames });
    } catch (error) {
        console.error('Error getting followers:', error);
        res.status(500).json({ message: 'Failed to get followers', error: error.message });
    }
};

// Get usernames of all users a user is following
const getAllFollowing = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const following = await Schema.User.find({ _id: { $in: user.following } }, 'username');
        const followingUsernames = following.map(following => following.username);

        res.status(200).json({ following: followingUsernames });
    } catch (error) {
        console.error('Error getting following:', error);
        res.status(500).json({ message: 'Failed to get following', error: error.message });
    }
};

module.exports = {
    followUser,
    unfollowUser,
    getTotalFollowersFollowing,
    getAllFollowers,
    getAllFollowing,
};
