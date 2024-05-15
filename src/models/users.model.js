const { Schema, model } = require("mongoose");

const schema = Schema({
  cookies_num: {
    type: Number,
    // unique: [true, "cookies_num unique"],
  },
  favorites: [
    {
      movie_data: { type: Schema.Types.ObjectId, ref: 'movies' }, // Reference the Movie model
      imdb_Data: {
        adult: String,
        backdrop_path: String,
        original_language: String,
        overview: String,
        popularity: Number,
        poster_path: String,
        release_date: String,
        vote_average: Number,
        vote_count: Number
      }
    }
  ]
});

// Pre-find hook to populate favorites with imdb_Data for each movie
schema.pre(/^find/, function (next) {
  this.populate('favorites.movie_data'); // Populate favorites with imdb_Data from Movie model
  next();
});

module.exports = model("User", schema);
