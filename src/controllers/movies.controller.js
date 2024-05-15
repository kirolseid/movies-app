
const MoviesModel = require('../models/movies.model');
const factory=require('../handlers/handler.factory')
const ApiFeatures = require('../utils/features');
const { catchAsyncError } = require('../utils/catchAsync');

// to create 
exports.createMovie = factory.createOne(MoviesModel)

// to get all Movies
exports.getAllMovies = catchAsyncError(async (req, res) => {
  let apiFeatures = new ApiFeatures(MoviesModel.find(), req.query).paginate().filter().search()
  movies = await apiFeatures.mongooseQuery
  res.status(200).json({ page: apiFeatures.page, movies });
});


// to get specific Movie
exports.getMovie = factory.getOne(MoviesModel)

// to get  Movie details from imdb
exports.getMoviebytitle = async (req, res, next) => {
 let result = await factory.getFromAPi(req.params.title)
  res.status(200).json({ success: true,  result:result });
};

// to update specific Movie
exports.updateMovie =factory.updateOne(MoviesModel)

// to delete specific Movie
exports.deleteMovie = factory.deleteOne(MoviesModel)


