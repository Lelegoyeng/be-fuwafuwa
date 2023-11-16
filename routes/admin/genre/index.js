const express = require("express");
const router = express.Router();
const GenreController = require("../../../controllers/admin/Genre");

router.get("/", GenreController.get);

module.exports = router;
