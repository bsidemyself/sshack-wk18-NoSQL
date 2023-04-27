const router = require('express').Router();

const {
    allUsers,
    oneUser,
    newUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(allUsers).post(newUser);

router.route('/:userId').get(oneUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/').put(addFriend) // check this

router.route('/:userId/friends/:friendId').put(removeFriend);  //this too

module.exports = router;