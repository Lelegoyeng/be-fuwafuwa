const express = require("express");
const router = express.Router();
const genreRoutes = require("./admin/genre");
const loginRoutes = require("./admin/login");


// Admin Fuwafuwa
router.use("/admin", genreRoutes);
router.use("/admin", loginRoutes);


module.exports = router;