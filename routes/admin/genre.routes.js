const express = require("express");
const router = express.Router();
const GenreController = require("../../controllers/admin/Genre");
const { authToken } = require("../../jwt/auth.token");


router.get("/genre", authToken, GenreController.get);
router.post("/genre", authToken, GenreController.create);
router.put("/genre/:id", authToken, GenreController.update);
router.delete("/genre/:id", authToken, GenreController.del);

module.exports = router;
