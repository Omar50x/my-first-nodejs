const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.pcub6d3.mongodb.net/my-first-nodejs')
    .then(
        () => {
            console.log('connected');
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    )

module.exports = mongoose;