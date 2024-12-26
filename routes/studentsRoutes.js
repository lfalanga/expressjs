const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

router
  .route("/")
  .get(studentsController.all)
  .post(studentsController.create);

router
  .route("/:id")
  .get(studentsController.get)
  .put(studentsController.update)
  .delete(studentsController.delete);

module.exports = router;
