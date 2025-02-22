const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    boughtAt: {
        type: Date,
        default: Date.now,
    },
    lastsFor: {
        type: Number,
        required: true,
        min: 0,
    }, // in days    
});

module.exports = mongoose.model('Grocery', grocerySchema);