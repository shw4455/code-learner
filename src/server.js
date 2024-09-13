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
    const postId = req.params.id;

    // 게시글 정보 가져오기
    connection.query(
        "SELECT * FROM posts WHERE id = ?",
        [postId],
        (err, postResults) => {
            if (err) throw err;

            // 댓글 정보 가져오기
            connection.query(
                "SELECT * FROM comments WHERE post_id = ?",
                [postId],
                (err, commentResults) => {
                    if (err) throw err;

                    // 클라이언트에 게시글 정보와 댓글 정보를 함께 전송
                    res.json({
                        post: postResults,
                        comments: commentResults,
                    });
                    console.log(
                        "postResults, commentResults",
                        postResults,
                        commentResults
                    );
                }
            );
        }
    );
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
