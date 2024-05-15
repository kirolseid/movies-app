const router = require("express").Router();
const { addToWatchlist, getWatchlist } = require("../controllers/user.controller");


router.route("/").get(getWatchlist);
router.route("/:id/:title").get(addToWatchlist)


module.exports = router;