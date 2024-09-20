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
app.get("/api/posts/:postId", (req, res) => {
    const postId = req.params.postId;
    console.log("요청이 들어왔습니다:", postId);

    // 유저 정보 가져오기
    connection.query(
        "SELECT u.* " +
            "FROM users u " +
            "JOIN posts p ON p.user_id = u.id " +
            "WHERE p.id = ?",
        [postId],
        (err, userResults) => {
            if (err) throw err;

            // 게시글 정보 가져오기
            connection.query(
                "SELECT * FROM posts WHERE id = ?",
                [postId],
                (err, postResults) => {
                    if (err) throw err;

                    // 댓글 정보 가져오기
                    connection.query(
                        "SELECT c.*, u.username " +
                            "FROM comments c " +
                            "JOIN users u ON c.writer_id = u.id " +
                            "WHERE c.post_id = ?",
                        [postId],
                        (err, commentResults) => {
                            if (err) throw err;

                            // 클라이언트에 게시글 정보와 댓글 정보를 함께 전송
                            // JavaScript 객체를 JSON 문자열로 변환
                            res.json({
                                user: userResults,
                                post: postResults,
                                comments: commentResults,
                                commentCount: commentResults.length,
                            });
                        }
                    );
                }
            );
        }
    );
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
