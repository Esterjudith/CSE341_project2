const { Movie }  = require('../models/moviesModel');


const getMovies = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const movies = await Movie.find();       
        res.status(200).json(movies);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

const createMovie = async (req,res) => {    
    /* #swagger.tags = ['Movie']
     */  
      /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Movie data to update',        
        schema: {      
            title : "Movie example",
            director: "Director example",
            releaseYear: 1970, 
            genre: "Drama",
            rating: 10,
            duration: 120,
            watched: true
        }
  } */
  try {

    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const getMovieById = async (req, res) => {
    //#swagger.tags = ['Movies']
   const { id } = req.params;
   try {
    const movie = await Movie.findById(id);
    if(!movie) {
        res.status(404).json({message: 'No movie found'});
    }
    res.status(200).json(movie);    
   }catch(error) {
    res.status(500).json({message: error.message});
   }
}

const updateMovie = async (req, res) => {
     /* #swagger.tags = ['Movie']
     */  
      /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Movie data to update',        
        schema: {      
            title : "Movie example",
            director: "Director example",
            releaseYear: 1970, 
            genre: "Drama",
            rating: 10,
            duration: 120,
            watched: true
        }
  } */
    const { id } = req.params;
    try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true
        });
        if(!movie){
            return res.status(404).json({message: 'Contact not found'});
        }
        res.status(200).json({message: 'Movie successfully updated', movie})
        
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        movie ?  res.status(200).json({message:'Contact deleted successfully',movie}): 
        res.status(404).json({message:'Movie not found'})
       
    }catch(error){
    res.status(500).json({message: error.message});
    }
}

module.exports = {
    getMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
}