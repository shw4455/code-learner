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
app.use(bodyParser.json());

// 회원가입 API
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

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (results.length === 0)
                return res.status(401).json({ error: "User not found" });

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(401).json({ error: "Invalid credentials" });

            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });
        }
    );
});

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer 토큰 형식: "Bearer <token>"
    if (!token)
        return res.status(403).json({ error: "Access denied, token missing!" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// 인증이 필요한 API 예시
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: "This is protected data", user: req.user });
});

// board 데이터 가져오기 API
app.get("/api/posts", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// 특정 게시글 데이터 가져오기 API
app.get("/api/posts/:postId", (req, res) => {
    const postId = req.params.postId;
    console.log("get 요청이 들어왔습니다:", postId);

    // 유저 및 게시글 정보 가져오기
    db.query(
        "SELECT p.*, u.username " +
            "FROM posts p " +
            "JOIN users u ON p.user_id = u.id " +
            "WHERE p.id = ?",
        [postId],
        (err, postResults) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (postResults.length === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.json({ post: postResults[0] });
        }
    );
});

// 특정 게시글의 댓글 가져오기 API
app.get("/api/posts/:postId/comments", (req, res) => {
    const postId = req.params.postId;
    console.log("댓글 목록 요청이 들어왔습니다:", postId);

    // 댓글 정보 가져오기
    db.query(
        "SELECT c.*, u.username " +
            "FROM comments c " +
            "JOIN users u ON c.writer_id = u.id " +
            "WHERE c.post_id = ? " +
            "ORDER BY c.created_at ASC",
        [postId],
        (err, commentResults) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(commentResults);
        }
    );
});

// 태그 가져오기 API
app.get("/api/posts/:postId/tags", (req, res) => {
    const postId = req.params.postId;
    console.log("태그 목록 요청이 들어왔습니다:", postId);

    // 태그 정보 가져오기
    db.query(
        "SELECT t.tag_name " +
            "FROM post_tags pt " +
            "JOIN tags t ON pt.tag_id = t.id " +
            "WHERE pt.post_id = ?",
        [postId],
        (err, tagResults) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(tagResults);
        }
    );
});

// 글 작성
app.post("/api/post", (req, res) => {
    console.log("req.body", req.body);

    const q = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
    const values = [req.body.title, req.body.content, req.body.user_id];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({
            message: "Post created successfully",
            postId: data.insertId,
        });
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

        res.json({ message: "Post deleted successfully" });
    });
});

// 댓글 삭제 API
app.delete("/api/comments/:commentId", (req, res) => {
    console.log("댓글 삭제 요청이 들어왔습니다");
    const commentId = req.params.commentId;

    const sql = "DELETE FROM comments WHERE id = ?";
    db.query(sql, [commentId], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    });
});
// 대댓글 작성
app.post("/api/posts/:postId/comments", (req, res) => {
    console.log("대댓글 요청이 들어왔습니다");
    const { postId } = req.params;
    const { writer_id, content, parent_id } = req.body;

    const sql = `
        INSERT INTO comments (post_id, writer_id, content, parent_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [postId, writer_id, content, parent_id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Comment added successfully" });
    });
});

// 댓글과 대댓글을 함께 가져오는 API
app.get("/api/posts/:postId/comments", (req, res) => {
    const { postId } = req.params;

    const sql = `
        SELECT * 
        FROM comments 
        WHERE post_id = ? 
        ORDER BY COALESCE(parent_id, id), created_at
    `;

    db.query(sql, [postId], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
