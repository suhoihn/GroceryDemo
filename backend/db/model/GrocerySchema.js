const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

module.exports = mongoose.model('Grocery', grocerySchema);