const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "비밀번호",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

// 인증문제가 있음.

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? , `cover` = ? WHERE id = ?";
  const value = [req.body.title, req.body.desc, req.body.price, req.body.cover];
  db.query(q, [...value, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Connected http://localhost:${port}`);
});
