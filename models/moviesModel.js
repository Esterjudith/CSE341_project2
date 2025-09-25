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

const reviewSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    reviewerName: {
        type: String        
    },
    rating: {
        type: Number, 
        min: 1,
        max: 10
    }, 
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Movie = mongoose.model('Movie', movieSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Movie, Review };