const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingName: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    } 

});

module.exports = mongoose.model('Recipe', recipeSchema);