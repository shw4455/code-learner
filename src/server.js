const express = require("express"); // Node.js를 위한 웹 애플리케이션 프레임워크, 서버 애플리케이션을 만들기 쉽게 해줌
const mysql = require("mysql2"); // MySQL 데이터베이스와 연결할 수 있도록 도와주는 패키지
const bcrypt = require("bcryptjs"); // 암호화를 위한 라이브러리
const jwt = require("jsonwebtoken"); // JWT(JSON Web Token)를 생성하고 검증하는 패키지
const cors = require("cors"); // CORS(Cross-Origin Resource Sharing) 요청을 허용하기 위한 미들웨어
const bodyParser = require("body-parser"); // Express에서 HTTP 요청의 본문 데이터를 쉽게 처리할 수 있도록 해주는 미들웨어

const app = express();
const port = 3001;
const JWT_SECRET = "your_secret_key"; // 환경 변수로 설정 권장

// MySQL 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "code_learner_db",
});

// 데이터베이스 연결
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// http://localhost:3000에서 온 요청만 허용하겠다, 기본적으로 보안상의 이유로 접근을 제한
app.use(cors({ origin: "http://localhost:3000" }));

// 애플리케이션에서 클라이언트로부터 전송된 JSON 형식의 데이터를 파싱하여 req.body 객체에 담아주는 미들웨어
app.use(bodyParser.json()); // 회원가입 API
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    // 중복 사용자 및 이메일 확인
    db.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [username, email],
        async (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (results.length > 0) {
                return res
                    .status(400)
                    .json({ error: "Username or email already exists" });
            }

            // 비밀번호 해싱 후 저장
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashedPassword],
                (err, result) => {
                    if (err)
                        return res
                            .status(500)
                            .json({ error: "Database error" });
                    res.status(201).json({ message: "User registered" });
                }
            );
        }
    );
});

// 로그인 API
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0)
            return res.status(401).json({ error: "User not found" });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch)
            return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    });
});

// board 데이터 가져오기 API
app.get("/api/posts", (req, res) => {
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

// 글 작성
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

// 글 업데이트
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

// 글 삭제
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

//
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
