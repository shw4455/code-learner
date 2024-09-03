const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// MySQL 연결 설정
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "code_learner_db",
});

// 데이터 가져오기 API 엔드포인트
app.get("/api/data", (req, res) => {
    pool.query("SELECT * FROM your_table", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving data");
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
