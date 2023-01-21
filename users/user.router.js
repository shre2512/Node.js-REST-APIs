const { createUser, getUsers, getUsersById, updateUser, deleteUser, getUserByUserEmail } = require('./user.controller')
const router = require('express').Router();
const {checkToken} = require('../auth/token_validation');

router.post('/login', getUserByUserEmail)
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', checkToken, getUsersById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);

module.exports = router;