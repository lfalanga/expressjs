const express = require("express");
const router = express.Router();
const professorsController = require("../controllers/professorsController");

router
  .route("/")
  .get(professorsController.all)
  .post(professorsController.create);

router
  .route("/:id")
  .get(professorsController.get)
  .put(professorsController.update)
  .delete(professorsController.delete);

module.exports = router;
