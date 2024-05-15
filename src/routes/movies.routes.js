const router = require("express").Router();
  
const {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMoviebytitle,
} = require("../controllers/movies.controller");


router.route("/").post(createMovie).get(getAllMovies);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);
router.get('/getmoviebyname/:title',getMoviebytitle)



module.exports = router;
