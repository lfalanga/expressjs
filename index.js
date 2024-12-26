const express = require("express");
const cors = require("cors");
const app = express();
const studentsRoutes = require("./routes/studentsRoutes");
const professorsRoutes = require("./routes/professorsRoutes");
const coursesRoutes = require("./routes/coursesRoutes");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello API REST!");
});
app.use("/students", studentsRoutes);
app.use("/professors", professorsRoutes);
app.use("/courses", coursesRoutes);

app.listen(3000, () => {
  console.log("server: active...");
});