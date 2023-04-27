const { Thought, User } = require('../models');

module.exports = {
    async allThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .populate({
                path: 'reactions',
                select: '-__v',
            })
            .select('-__v')
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async oneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select("-__v");
            if (!thought) {
                return res.status(404).json({ message: 'no thought found with that id' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async newThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // async newThought(req, res) {
    //     try {
    //         const user = await User.findOneAndUpdate(
    //             { _id: req.params.userId },
    //             { $addToSet: { thoughts: req.body } },
    //             { new: true }
    //         );
    //         if (!user) {
    //             return res.status(400).json({ message: 'no user found with that id' });
    //         }
    //         res.json(user);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'no thought found with that id '});
            }
            res.json({ message: 'thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {$set: req.body },
                {new: true}
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought found with that id' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: {reactions: body}},
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought found with that id' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought found with that id' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}