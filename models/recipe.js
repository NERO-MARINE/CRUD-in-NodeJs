const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
    },
    category:{
        type: String,
        enum: ['SOUP', 'RICE', 'BEANS', 'SNACKS', 'PORRIDGE'],
        required: true
    },
    image:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
}, {timestamps: true});

// for search - specific properties to search
recipeSchema.index({name:'text', description:'text'});

// for search - wildcard indexing
// recipeSchema.index({"$**": 'text'});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;