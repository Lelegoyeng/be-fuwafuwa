const express = require("express");
const router = express.Router();
const genreRoutes = require("./admin/genre");

// Admin Fuwafuwa
router.use("/admin/genre", genreRoutes);

module.exports = router;