const { Review, Movie } = require('../models/moviesModel');

const getAllReviews = async (req, res, next) => {
    //#swagger.tags = ['Reviews']
    try {

        const reviews = await Review.find();
        res.status(200).json(reviews);

    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

const createReview = async (req, res, next) => {
    //#swagger.tags = ['Review']
     /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Movie data to update',        
        schema: {                 
            movieId: "68d3841f57d0f5f1db5518f3",
            reviewerName: "Sarah Thompson",
            rating: 8,
            comment: "Great pacing and visuals, but a little too long."
        }
  } */
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

const getReviewById = async (req, res, next) => {
     //#swagger.tags = ['Review']
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if(!review) {
            res.status(400).json({message: 'No page found'});
        }
        res.status(200).json(review);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const updateReview = async (req, res, next) => {
    //#swagger.tags = ['Review']
     /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Review data to update',        
        schema: {                 
            movieId: "68d3841f57d0f5f1db5518f3",
            reviewerName: "Sarah Thompson",
            rating: 8,
            comment: "Great pacing and visuals, but a little too long."
        }
  } */
  const { id } = req.params;
  try {
      const review = await Review.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true
        });
        if(!review){
            return res.status(404).json({message: 'Contact not found'});
        }
        res.status(200).json({message: 'Review successfully updated', review}) 
  }catch(error){
    res.status(500).json({message: error.message})
  }
}

const deleteReview = async (req, res) => {
    //#swagger.tags=['Review']
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        review ?  res.status(200).json({message:'Contact deleted successfully', review}): 
        res.status(404).json({message:'Review not found'})
       
    }catch(error){
    res.status(500).json({message: error.message});
    }
}

module.exports = {getAllReviews, createReview, getReviewById, updateReview, deleteReview};