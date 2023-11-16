const express = require("express");
const router = express.Router();
const genreRoutes = require("./admin/genre");

// Admin Fuwafuwa
router.use("/admin", genreRoutes);

module.exports = router;