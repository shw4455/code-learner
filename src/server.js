const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001;

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "code_learner_db",
});

app.use(cors({ origin: "http://localhost:3000" }));

// 데이터베이스 연결
connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// 데이터 가져오기 API
app.get("/api/data", (req, res) => {
    connection.query("SELECT * FROM posts", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
