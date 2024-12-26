const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

router
  .route("/")
  .get(coursesController.all)
  .post(coursesController.create);

router
  .route("/join")
  .post(coursesController.join);

router
  .route("/:id")
  .get(coursesController.get)
  .put(coursesController.update)
  .delete(coursesController.delete);

module.exports = router;
