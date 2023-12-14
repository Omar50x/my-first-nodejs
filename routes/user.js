const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Add user
router.post('/add', (req, res) => {
    data = req.body;
    usr = new User(data);
    usr.save()
        .then(
            (savedUser) => {
                res.status(200).send(savedUser)
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err)
            }
        )
})

// Method 2
router.post('/second-add', async (req, res) => {
    try {
        data = req.body;
        usr = new User(data);
        savedUser = await usr.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all users
router.get('/second-getAll', (req, res) => {
    User.find()
        .then(
            (users) => {
                res.status(200).send(users);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

// Method 2
router.get('/getAll', async (req, res) => {
    try {
        users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get user if age = 28
router.get('/getUser', async (req, res) => {
    try {
        users = await User.find({firstname: "Omar", age: 28});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get user by id
router.get('/getById/:id', async (req, res) => {
    myId = req.params.id;
    User.findOne({_id: myId})
        .then(
            (user) => {
                res.status(200).send(user);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

// Method 2
router.get('/second-getById/:id', async (req, res) => {
    try {
        myId = req.params.id;
        user = await User.findById({_id: myId});
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete user
router.delete('/delete/:id', (req, res) => {
    myId = req.params.id;
    User.findOneAndDelete({_id: myId})
        .then(
            (deletedUser) => {
                res.status(200).send(deletedUser);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

// Method 2
router.delete('/second-delete/:id', async (req, res) => {
    try {
        myId = req.params.id;
        deletedUser = await User.findByIdAndDelete({_id: myId});
        res.status(200).send(deletedUser)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update user
router.put('/update/:id', (req, res) => {
    myId = req.params.id;
    newData = req.body;
    User.findByIdAndUpdate({_id: myId}, newData)
        .then(
            (updatedUser) => {
                res.status(200).send(updatedUser);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

// Method 2
router.put('/second-update/:id', async (req, res) => {
    try {
        myId = req.params.id;
        newData = req.body;
        updated = await User.findOneAndUpdate({_id: myId}, newData);
        res.status(200).send(updated)
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;