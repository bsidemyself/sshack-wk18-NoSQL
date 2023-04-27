const router = require('express').Router();

const {
    allThoughts,
    oneThought,
    newThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/'). get(allThoughts).post(newThought);

router
    .route('/:thoughtId')
    .get(oneThought)
    .delete(deleteThought)
    .put(updateThought)
    .put(addReaction); // this one?

router.route('/:thoughtId/reactions/').put(addReaction); // or this one?

router.route('/:thoughtId/reactions/:reactionId').put(deleteReaction);

module.exports = router;