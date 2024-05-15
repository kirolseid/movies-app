const usersModel = require("../models/users.model");
const { catchAsyncError } = require("../utils/catchAsync");
const factory=require('../handlers/handler.factory')


exports.addToWatchlist =catchAsyncError( async (req, res, next) => {
  var cookie = req.cookies.cookieName;
  let result = await factory.getFromAPi(req.params.title)
  req.body.imdb_Data = result
  req.body.movie_data = req.params.id

  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("cookieName", randomNumber, { maxAge: 1000*60*60*24*365 , httpOnly: true });
    let fav = new usersModel({
      cookies_num: randomNumber,
      favorites: req.body,
    });
    await fav.save();
    res.status(201).json({ success: true, message: "movie added in watchlist" });

  } else {
    // yes, cookie was already present
     await usersModel.findOneAndUpdate(
      { cookies_num: cookie },{$addToSet: { favorites: req.body }}
      ,{ new: true }
    );
    res.status(201).json({ success: true, message: "movie added in watchlist" });
  }
});



exports.getWatchlist = catchAsyncError(async (req, res, next) => {
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
      res.json({ "cookie": "user not fonud" });
  } else {
    let FavMovies = await usersModel.findOne(
      { cookies_num: cookie }
    );
    res.status(201).json({ success: true,FavMovies });
  }
});



