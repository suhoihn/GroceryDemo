const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://localhost:27017/Groceries?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to the database!');
        })
        .catch((e) => {
            console.log(e)
        })

    mongoose.connection.on("disconnected", connect);
}

module.exports = () => connect();