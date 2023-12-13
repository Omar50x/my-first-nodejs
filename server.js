const express = require('express');
require('./config/connect');
const User = require('./models/user');
const Product = require('./models/product');

const app = express();
app.use(express.json());

// Add user
    app.post('/add', (req, res) => {
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
    app.post('/second-add', async (req, res) => {
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
    app.get('/second-getAll', (req, res) => {
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
    app.get('/getAll', async (req, res) => {
        try {
            users = await User.find();
            res.status(200).send(users);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Get user if age = 28
    app.get('/getUser', async (req, res) => {
        try {
            users = await User.find({firstname: "Omar", age: 28});
            res.status(200).send(users);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Get user by id
    app.get('/getById/:id', async (req, res) => {
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
    app.get('/second-getById/:id', async (req, res) => {
        try {
            myId = req.params.id;
            user = await User.findById({_id: myId});
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Delete user
    app.delete('/delete/:id', (req, res) => {
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
    app.delete('/second-delete/:id', async (req, res) => {
        try {
            myId = req.params.id;
            deletedUser = await User.findByIdAndDelete({_id: myId});
            res.status(200).send(deletedUser)
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Update user
    app.put('/update/:id', (req, res) => {
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
    app.put('/second-update/:id', async (req, res) => {
        try {
            myId = req.params.id;
            newData = req.body;
            updated = await User.findOneAndUpdate({_id: myId}, newData);
            res.status(200).send(updated)
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Add product
    app.post('/addProduct', async (req, res) => {
        try {
            data = req.body;
            prod = new Product(data);
            savedProduct = await prod.save();
            res.status(200).send(savedProduct);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Get all products
    app.get('/getAllProduct', async (req, res) => {
        try {
            products = await Product.find();
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Get product by id
    app.get('/getProductById/:id', async (req, res) => {
        try {
            myId = req.params.id;
            product = await Product.findById({_id: myId});
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Delete product
    app.delete('/deleteProduct/:id', async (req, res) => {
        try {
            myId = req.params.id;
            deletedProduct = await Product.findByIdAndDelete({_id: myId});
            res.status(200).send(deletedProduct)
        } catch (error) {
            res.status(400).send(error);
        }
    })

// Update product
    app.put('/updateProduct/:id', async (req, res) => {
        try {
            myId = req.params.id;
            newData = req.body;
            updated = await Product.findOneAndUpdate({_id: myId}, newData);
            res.status(200).send(updated)
        } catch (error) {
            res.status(400).send(error);
        }
    })

app.listen(3001, () => {
    console.log("server work");
})
