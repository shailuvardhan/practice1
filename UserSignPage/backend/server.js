// server.js
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

// Set up SQLite database
const db = new sqlite3.Database("users.db");

// Create table for users
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    password TEXT
  );
`);

// Implement user authentication using JWT tokens
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const id = uuid.v4();
  db.run(
    `INSERT INTO users (id, username, password) VALUES (?, ?, ?)`,
    id,
    username,
    password,
    (err) => {
      if (err) return res.status(500).json({ error: "Error creating user" });
      res.json({ message: "User created successfully" });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    username,
    password,
    (err, row) => {
      if (err || !row)
        return res.status(401).json({ error: "Invalid username or password" });
      const token = jwt.sign({ username }, "secretkey", { expiresIn: "1h" });
      res.json({ token });
    }
  );
});

// Implement token validation middleware
app.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
});

// app.get("/home", (req, res) => {
//   res.json({ message: "Welcome to the home page" });
// });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
