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

// http://localhost:3000에서 온 요청만 허용하겠다, 기본적으로 보안상의 이유로 접근을 제한
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

// 데이터 가져오기 API
app.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        "SELECT * FROM posts Where id = ?",
        [id],
        (err, results) => {
            if (err) throw err;
            res.send(results[0]);

            console.log("results[0]:", results[0]);
        }
    );
    console.log("postId:", id);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
