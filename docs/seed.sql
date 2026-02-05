-- =========================================
-- code_learner_db seed.sql (safe for utf8mb4)
-- tables: users, posts, comments, tags, post_tags
-- =========================================

-- 문자 인코딩 통일(한글/이모지 깨짐 방지)
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS code_learner_db;
USE code_learner_db;

-- seed 재실행 시 FK 제약으로 인한 실패 방지
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE post_tags;
TRUNCATE TABLE comments;
TRUNCATE TABLE tags;
TRUNCATE TABLE posts;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- =========================================
-- 1) users
-- ⚠️ 현재는 평문 예시. (서버가 bcrypt.compare를 쓰면 로그인 테스트용으로는 해시로 바꾸세요)
-- =========================================
INSERT INTO users (username, password, email, created_at) VALUES
('user1', 'password1', 'user1@example.com', '2024-09-13 05:17:38'),
('user2', 'password2', 'user2@example.com', '2024-09-13 05:17:38'),
('demo',  '$2b$10$IVEpFjH/B9J3l/nJUSY9uOmEhIsSVdAZruXeuxMwS56FawFxlgmgK',  'demo@example.com',  NOW());

-- =========================================
-- 2) tags
-- =========================================
INSERT INTO tags (tag_name) VALUES
('html'),   -- id 1
('css'),    -- id 2
('js'),     -- id 3
('react'),  -- id 4
('node'),   -- id 5
('mysql');  -- id 6

-- =========================================
-- 3) posts (30)
-- created_at: DATE
-- user_id: 1~3 순환
-- =========================================
INSERT INTO posts (title, user_id, content, created_at, views, likes) VALUES
('게시글 1: 시작합니다', 1, 'React/Express/MySQL 연동을 위한 데모 게시글입니다.', '2024-01-01', 12, 1),
('게시글 2: JWT 인증', 2, 'JWT 발급 및 인증 미들웨어 흐름을 점검합니다.', '2024-01-03', 45, 3),
('게시글 3: CRUD 기본', 3, '게시글 생성/조회/수정/삭제의 기본 흐름 확인.', '2024-01-05', 3, 0),
('게시글 4: axios 통신', 1, '클라이언트에서 axios로 API 호출 테스트.', '2024-01-08', 78, 12),
('게시글 5: CORS', 2, 'Origin 불일치 문제와 cors 미들웨어 적용 확인.', '2024-01-10', 21, 2),

('게시글 6: DB 연결', 3, 'mysql2를 통한 DB 연결 및 쿼리 실행 확인.', '2024-01-12', 9, 1),
('게시글 7: 목록 정렬', 1, 'created_at 기준 최신순 정렬 테스트.', '2024-01-15', 134, 25),
('게시글 8: 조회수', 2, '조회수 증가 로직이 정상 동작하는지 확인.', '2024-01-18', 56, 7),
('게시글 9: 좋아요', 3, 'likes 증가 처리 테스트.', '2024-01-20', 8, 0),
('게시글 10: 라우트 가드', 1, '로그인 사용자만 접근 가능한 화면 테스트.', '2024-01-22', 201, 40),

('게시글 11: 에러 처리', 2, '에러 발생 시 응답 포맷과 프론트 처리 확인.', '2024-02-01', 67, 9),
('게시글 12: 입력 검증', 3, '빈 제목/본문 등 유효성 검증 체크.', '2024-02-03', 14, 2),
('게시글 13: 권한', 1, '작성자만 수정/삭제 가능한지 확인.', '2024-02-05', 98, 17),
('게시글 14: 리팩토링', 2, '컨트롤러/서비스 분리 이후 동작 점검.', '2024-02-07', 6, 0),
('게시글 15: UI 컴포넌트', 3, '컴포넌트 분리 및 조건부 렌더링 확인.', '2024-02-10', 44, 5),

('게시글 16: 페이징', 1, 'LIMIT/OFFSET 기반 페이징 구현 대비.', '2024-02-12', 32, 4),
('게시글 17: 검색', 2, '키워드 검색 기능 구현 대비 데이터.', '2024-02-14', 11, 1),
('게시글 18: 태그 조인', 3, 'post_tags 조인을 확인하기 위한 게시글.', '2024-02-16', 89, 13),
('게시글 19: 댓글', 1, '댓글 목록 조회/작성 흐름 테스트.', '2024-02-18', 157, 33),
('게시글 20: 날짜', 2, '날짜 포맷/정렬 확인을 위한 데이터.', '2024-02-20', 23, 2),

('게시글 21: API 응답', 3, 'success/data 형태 응답 구조 점검.', '2024-03-01', 4, 0),
('게시글 22: 상태관리', 1, 'React 상태 흐름 점검용 게시글.', '2024-03-03', 65, 8),
('게시글 23: 인증 만료', 2, 'JWT 만료 처리 흐름 확인 대비.', '2024-03-05', 19, 1),
('게시글 24: 댓글 UI', 3, '댓글 UI 렌더링/등록 테스트.', '2024-03-07', 72, 10),
('게시글 25: 리스트 UI', 1, '게시글 리스트 컴포넌트 확인.', '2024-03-09', 5, 0),

('게시글 26: 성능', 2, '목록 조회 성능 점검 대비.', '2024-03-11', 141, 27),
('게시글 27: 배포 대비', 3, '환경변수(.env) 분리 필요성 기록.', '2024-03-13', 38, 6),
('게시글 28: 회고', 1, '트러블슈팅을 기록하기 위한 게시글.', '2024-03-15', 91, 14),
('게시글 29: 데모', 2, '데모 환경에서 동작 확인.', '2024-03-17', 12, 1),
('게시글 30: 마무리', 3, '샘플 데이터 마지막 게시글입니다.', '2024-03-19', 250, 60);

-- =========================================
-- 4) post_tags
-- posts(1~30)에 대해 태그 2개씩 매핑
-- 규칙:
--  - 홀수 post_id: (react=4, node=5)
--  - 짝수 post_id: (js=3, mysql=6)
-- =========================================
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id,
       CASE WHEN (p.id % 2)=1 THEN 4 ELSE 3 END AS tag_id
FROM posts p;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id,
       CASE WHEN (p.id % 2)=1 THEN 5 ELSE 6 END AS tag_id
FROM posts p;

-- =========================================
-- 5) comments
-- posts(1~30)에 0~2개씩 샘플 댓글
-- 규칙:
--  - post_id % 3 = 0 인 글에는 댓글 2개
--  - post_id % 5 = 0 인 글에는 댓글 1개
-- =========================================
INSERT INTO comments (post_id, writer_id, content, created_at, parent_id)
SELECT p.id,
       CASE WHEN (p.id % 2)=1 THEN 1 ELSE 2 END AS writer_id,
       CONCAT('댓글: 게시글 ', p.id, '에 대한 첫 번째 댓글입니다.') AS content,
       NOW(),
       NULL
FROM posts p
WHERE (p.id % 3)=0 OR (p.id % 5)=0;

INSERT INTO comments (post_id, writer_id, content, created_at, parent_id)
SELECT p.id,
       CASE WHEN (p.id % 2)=1 THEN 2 ELSE 1 END AS writer_id,
       CONCAT('댓글: 게시글 ', p.id, '에 대한 두 번째 댓글입니다.') AS content,
       NOW(),
       NULL
FROM posts p
WHERE (p.id % 3)=0;

-- =========================================
-- 확인용 카운트
-- =========================================
SELECT 'users' AS table_name, COUNT(*) AS cnt FROM users
UNION ALL SELECT 'posts', COUNT(*) FROM posts
UNION ALL SELECT 'comments', COUNT(*) FROM comments
UNION ALL SELECT 'tags', COUNT(*) FROM tags
UNION ALL SELECT 'post_tags', COUNT(*) FROM post_tags;
