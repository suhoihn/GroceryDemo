const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    name: String,
    weight: Number,
    boughtAt: Date,
    lastsFor: Number, // in days    
});

module.exports = mongoose.model('Grocery', grocerySchema);