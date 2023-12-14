const express = require('express');
const Product = require('../models/product');
const multer = require('multer');

const router = express.Router();

let fileName = '';
const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null, fl);
        fileName = fl;
    }
})

const upload = multer({storage: myStorage});

// Add product
router.post('/addProduct', upload.any('image'), async (req, res) => {
    try {
        data = req.body;
        prod = new Product(data);
        prod.image = fileName;
        savedProduct = await prod.save();
        fileName = '';
        res.status(200).send(savedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all products
router.get('/getAllProduct', async (req, res) => {
    try {
        products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get product by id
router.get('/getProductById/:id', async (req, res) => {
    try {
        myId = req.params.id;
        product = await Product.findById({_id: myId});
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete product
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        myId = req.params.id;
        deletedProduct = await Product.findByIdAndDelete({_id: myId});
        res.status(200).send(deletedProduct)
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update product
router.put('/updateProduct/:id', async (req, res) => {
    try {
        myId = req.params.id;
        newData = req.body;
        updated = await Product.findOneAndUpdate({_id: myId}, newData);
        res.status(200).send(updated)
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;