const db = require("../database/connection");

class CoursesController {
  constructor() {}

  all(req, res) {
    // res.json({ msg: "courses: get." });
    try {
      db.query(`SELECT * FROM course;`, [], (err, rows) => {
        if (err) {
          res.status(400).send(err);
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  get(req, res) {
    // res.json({ msg: `course: get: ${id}.` });
    try {
      const { id } = req.params;
      db.query(`SELECT * FROM course WHERE id = ?;`, [id], (err, rows) => {
        if (err) {
          res.status(400).send(err);
        }
        // res.status(200).json(rows);
        res.status(200).json(rows[0]);
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  create(req, res) {
    // res.json({ msg: "course: creation." });
    try {
      const { name, description, id_professor } = req.body;
      db.query(
        `INSERT INTO course
          (id, name, description, id_professor)
          VALUES(null, ?, ?, ?);`,
        [name, description, id_professor],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else {
            res.status(201).json({ id: rows.insertId });
          }
        }
      );
    } catch (err) {
      // console.log(err);
      res.status(500).send(err.message);
    }
  }

  update(req, res) {
    // res.json({ msg: "course: modification." });
    try {
      const { id } = req.params;
      const { name, description, id_professor } = req.body;
      db.query(
        `UPDATE course
          SET name=?, description=?, id_professor=?
          WHERE id=?;`,
        [name, description, id_professor, id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
          }
          // res.status(200).json(rows);
          if (rows.affectedRows === 1) {
            res.status(200).json({ message: "updated registry" });
          }
        }
      );
    } catch (err) {
      // console.log(err);
      res.status(500).send(err.message);
    }
  }

  delete(req, res) {
    // res.json({ msg: "course: deletion." });
    try {
      const { id } = req.params;
      db.query(`DELETE FROM course WHERE id=?;`, [id], (err, rows) => {
        if (err) {
          res.status(400).send(err);
        }
        // res.status(200).json(rows);
        if (rows.affectedRows === 1) {
          res.status(200).json({ message: "deleted registry" });
        }
      });
    } catch (err) {
      // console.log(err);
      res.status(500).send(err.message);
    }
  }

  join(req, res) {
    try {
      const { id_course, id_student } = req.body;
      db.query(
        `INSERT INTO course_student
          (id_course, id_student)
          VALUES(?, ?);`,
        [id_course, id_student],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else {
            res.status(201).json({ message: "joined student" });
          }
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new CoursesController();
