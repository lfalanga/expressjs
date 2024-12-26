const db = require("../database/connection");

class StudentsController {
  constructor() {}

  all(req, res) {
    // res.json({ msg: "students: get." });
    try {
      db.query(`SELECT * FROM student;`, [], (err, rows) => {
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
    // res.json({ msg: `student: get: ${id}.` });
    try {
      const { id } = req.params;
      db.query(`SELECT * FROM student WHERE id = ?;`, [id], (err, rows) => {
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
    // res.json({ msg: "student: creation." });
    try {
      const { dni, name, lastname, email } = req.body;
      db.query(
        `INSERT INTO student
          (id, dni, name, lastname, email)
          VALUES(null, ?, ?, ?, ?);`,
        [dni, name, lastname, email],
        (err, rows) => {
          if (err) {
            res.status(400).send(err);
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
    // res.json({ msg: "student: modification." });
    try {
      const { id } = req.params;
      const { dni, name, lastname, email } = req.body;
      db.query(
        `UPDATE student
          SET dni=?, name=?, lastname=?, email=?
          WHERE id=?;`,
        [dni, name, lastname, email, id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
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
    // res.json({ msg: "student: deletion." });
    try {
      const { id } = req.params;
      db.query(`DELETE FROM student WHERE id=?;`, [id], (err, rows) => {
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
}

module.exports = new StudentsController();
