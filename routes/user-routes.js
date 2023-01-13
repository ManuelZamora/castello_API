const express = require('express');
const { addUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userControlles');

const router = express.Router();

router.post('/addUser', addUser);
router.get('/showUsers', getAllUsers);
router.get('/showUser/:id', getUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser)

module.exports = {
    routes: router
}