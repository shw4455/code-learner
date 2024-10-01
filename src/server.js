const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// MySQL 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "code_learner_db",
});

// http://localhost:3000에서 온 요청만 허용하겠다, 기본적으로 보안상의 이유로 접근을 제한
app.use(cors({ origin: "http://localhost:3000" }));

// 애플리케이션에서 클라이언트로부터 전송된 JSON 형식의 데이터를 파싱하여 req.body 객체에 담아주는 미들웨어
app.use(bodyParser.json());

// 데이터베이스 연결
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// board 데이터 가져오기 API
app.get("/api/data", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// post 데이터 가져오기 API
app.get("/api/posts/:postId", (req, res) => {
    const postId = req.params.postId;
    console.log("get 요청이 들어왔습니다:", postId);

    // 유저 정보 가져오기
    db.query(
        "SELECT u.* " +
            "FROM users u " +
            "JOIN posts p ON p.user_id = u.id " +
            "WHERE p.id = ?",
        [postId],
        (err, userResults) => {
            if (err) throw err;

            // 게시글 정보 가져오기
            db.query(
                "SELECT * FROM posts WHERE id = ?",
                [postId],
                (err, postResults) => {
                    if (err) throw err;

                    // 댓글 정보 가져오기
                    db.query(
                        "SELECT c.*, u.username " +
                            "FROM comments c " +
                            "JOIN users u ON c.writer_id = u.id " +
                            "WHERE c.post_id = ?",
                        [postId],
                        (err, commentResults) => {
                            if (err) throw err;

                            // 태그 정보 가져오기
                            db.query(
                                "SELECT t.tag_name " +
                                    "FROM post_tags pt " +
                                    "INNER JOIN tags t ON pt.tag_id = t.id " +
                                    "WHERE pt.post_id = ?",
                                [postId],
                                (err, tagsResults) => {
                                    if (err) throw err;

                                    // 클라이언트에 게시글 정보와 댓글 정보를 함께 전송
                                    // JavaScript 객체를 JSON 문자열로 변환
                                    res.json({
                                        user: userResults,
                                        post: postResults,
                                        comments: commentResults,
                                        tags: tagsResults,
                                        commentCount: commentResults.length,
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

app.post("/api/post", (req, res) => {
    console.log("req.body", req.body);

    const q = "INSERT INTO posts(`title`, `content`) VALUES (?)";

    const values = [req.body.title, req.body.content];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });

    console.log("post 요청이 들어왔습니다:");
});

app.put("/api/post/:postId", (req, res) => {
    const postId = req.params.postId;
    console.log("postId", postId);

    const q = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    const values = [req.body.title, req.body.content, postId];

    console.log("values", values);

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Post not found" });

        res.json({ message: "Post updated successfully" });
    });

    console.log("PUT 요청이 들어왔습니다:", req.body);
});

app.delete("/api/post/:postId", (req, res) => {
    const postId = req.params.postId;
    console.log("DELETE 요청이 들어왔습니다: ", postId);

    const q = "DELETE FROM posts WHERE id = ?";
    const values = [postId];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Post not found" });

        res.json({ message: "Post delete successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
