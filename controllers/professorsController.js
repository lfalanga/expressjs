const db = require("../database/connection");

class ProfessorsController {
  constructor() {}

  all(req, res) {
    // res.json({ msg: "professors: get." });
    try {
      db.query(`SELECT * FROM professor;`, [], (err, rows) => {
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
    // res.json({ msg: "professor: get." });
    try {
      const { id } = req.params;
      db.query(`SELECT * FROM professor WHERE id = ?;`, [id], (err, rows) => {
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
    // res.json({ msg: "professor: creation." });
    try {
      const { dni, name, lastname, email, profession, phone } = req.body;
      db.query(
        `INSERT INTO professor
          (id, dni, name, lastname, email, profession, phone)
          VALUES(null, ?, ?, ?, ?, ?, ?);`,
        [dni, name, lastname, email, profession, phone],
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
    // res.json({ msg: "professor: modification." });
    try {
      const { id } = req.params;
      const { dni, name, lastname, email, profession, phone } = req.body;
      db.query(
        `UPDATE professor
          SET dni=?, name=?, lastname=?, email=?, profession=?, phone=?
          WHERE id=?;`,
        [dni, name, lastname, email, profession, phone, id],
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
    // res.json({ msg: "professor: deletion." });
    try {
      const { id } = req.params;
      db.query(`DELETE FROM professor WHERE id=?;`, [id], (err, rows) => {
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

module.exports = new ProfessorsController();
