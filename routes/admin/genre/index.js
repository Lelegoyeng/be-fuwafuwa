const express = require("express");
const router = express.Router();
const GenreController = require("../../../controllers/admin/Genre");

router.get("/genre", GenreController.get);
router.post("/genre", GenreController.create);
router.put("/genre/:id", GenreController.update);
router.delete("/genre/:id", GenreController.del);

module.exports = router;
