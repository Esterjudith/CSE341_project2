const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    director: {
        type: String
    },
    releaseYear: {
        type: Number
    }, 
    genre : {
        type: String
    },
    rating: {
        type: Number,
        min:1,
        max:10
    },
    duration: {
        type: Number
    },
    watched: {
        type: Boolean
    }
})

module.exports = mongoose.model('Movie', movieSchema);