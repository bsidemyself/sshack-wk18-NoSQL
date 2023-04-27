const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    
    async allUsers(req, res) {
        try {
            const users = await User.find()
            .select('-__v')
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async oneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async newUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' })
            }
            res.json({ message: 'user deleted'})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {$set: req.body },
                {new: true}
            );
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}