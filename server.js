const express = require('express');
require('./config/connect');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

const app = express();
app.use(express.json());

app.use('/product', productRouter);
app.use('/user', userRouter);

app.use('/getImage', express.static('./uploads'));

app.listen(3001, () => {
    console.log("server work");
})
