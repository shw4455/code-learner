# 현재
+---------------------------+
| Tables_in_code_learner_db |
+---------------------------+
| posts                    |
+---------------------------+

+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int          | NO   | PRI | NULL    | auto_increment |
| title      | varchar(100) | NO   |     | NULL    |                |
| author     | varchar(50)  | NO   |     | NULL    |                |
| content    | text         | YES  |     | NULL    |                |
| created_at | date         | NO   |     |r NULL    |                |
| views      | int          | YES  |     | 0       |                |
| likes      | int          | YES  |     | 0       |                |
+------------+--------------+------+-----+---------+----------------+

# 중간점검
user
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| username   | varchar(50)  | NO   |     | NULL              |                   |
| password   | varchar(255) | NO   |     | NULL              |                   |
| email      | varchar(100) | NO   | UNI | NULL              |                   |
| created_at | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+

posts
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int          | NO   | PRI | NULL    | auto_increment |
| title      | varchar(100) | NO   |     | NULL    |                |
| user_id    | int          | NO   |     | NULL    |                |
| content    | text         | YES  |     | NULL    |                |
| created_at | date         | NO   |     | NULL    |                |
| views      | int          | NO   |     | 0       |                |
| likes      | int          | NO   |     | 0       |                |
+------------+--------------+------+-----+---------+----------------+

 comments
+------------+----------+------+-----+-------------------+-------------------+
| Field      | Type     | Null | Key | Default           | Extra             |
+------------+----------+------+-----+-------------------+-------------------+
| id         | int      | NO   | PRI | NULL              | auto_increment    |
| post_id    | int      | YES  | MUL | NULL              |                   |
| writer_id  | int      | YES  | MUL | NULL              |                   |
| content    | text     | YES  |     | NULL              |                   |
| created_at | datetime | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| parent_id  | int      | YES  |     | NULL              |                   |
+------------+----------+------+-----+-------------------+-------------------+

# 계획
posts 테이블에 created_at의 타입을 date -> timestamp로

author: 작성자 아이디 (foreign key -> user 테이블)
[x] author를, username으로 바꾸고
   ALTER TABLE posts
   CHANGE author username VARCHAR(50);
[] posts에 username가
    작성한 유저의 정보를 받아와야할거 같은데
[] user 테이블에 username을? 왜래키 해야할듯

updated_at: 수정 시간 (datetime)
is_deleted: 삭제 여부 (boolean)에 대해서 추가

[] 사용자의 id 값이 변경될 때, posts 테이블의 user_id 값도 자동으로 업데이트됩니다.

# 해줘야 하는 것
ALTER TABLE posts (
    ADD author
    ADD updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    ADD is_deleted BOOLEAN DEFAULT FALSE


# 질문
[x] 그 전에 왜래키에 대한 개념이 부족하다
[x] created_at이 겹치는데
    충돌, 안 생기나?
    join을 쓰는 경우에는?
        as로 별칭을 부여하여 구분
[x] comment에 id 충돌 안 생기나?
    comment_id로 바꿔야하는거 아니야?
     각 테이블의 id 컬럼은 해당 테이블 내에서 유일한 값을 가지도록 설계되기 때문에 충돌할 가능성은 낮다
[x] parent_id는 그럼 자기자신 테이블의 주요키를 참조하는건지
    => O
[x] 그럼 질의도 모두 왜래키를 통해서 이루어지겠네?
    => O
    데이터 관계 표현도
[x] 왜래키 설정 예시

# SHOW CREATE TABLE

| users | CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
)
| posts | CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `user_id` int DEFAULT NULL,
  `content` text,
  `created_at` date NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_posts_users` (`user_id`),
  CONSTRAINT `fk_posts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
| comments | CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `writer_id` int DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `writer_id` (`writer_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`writer_id`) REFERENCES `users` (`id`)
)

# select * from
users
+----+----------+-----------+-------------------+---------------------+
| id | username | password  | email             | created_at          |
+----+----------+-----------+-------------------+---------------------+
|  1 | user1    | password1 | user1@example.com | 2024-09-13 05:17:38 |
|  2 | user2    | password2 | user2@example.com | 2024-09-13 05:17:38 |
+----+----------+-----------+-------------------+---------------------+

posts
+----+----------------------+---------+-------------------------+------------+-------+-------+
| id | title                | user_id | content                 | created_at | views | likes |
+----+----------------------+---------+-------------------------+------------+-------+-------+
|  1 | 첫 번째 게시글       |       1 | 본문 내용입니다.        | 2024-09-13 |     0 |     0 |
|  2 | 두 번째 게시글       |       1 | 본문 내용입니다.        | 2024-09-13 |     0 |     0 |
|  3 | 세 번째 게시글       |       2 | 본문 내용입니다.        | 2024-09-13 |     0 |     0 |
|  4 | 네 번째 게시글       |       2 | 본문 내용입니다.        | 2024-09-13 |     0 |     0 |
+----+----------------------+---------+-------------------------+------------+-------+-------+

comments
+----+---------+-----------+-----------------------------------------------------+---------------------+-----------+
| id | post_id | writer_id | content                                             | created_at          | parent_id |
+----+---------+-----------+-----------------------------------------------------+---------------------+-----------+
| 33 |       1 |         1 | 첫 번째 게시글의 첫 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 34 |       1 |         2 | 첫 번째 게시글의 두 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 35 |       1 |         1 | 첫 번째 게시글의 세 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 36 |       1 |         2 | 첫 번째 게시글의 네 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 37 |       2 |         1 | 두 번째 게시글의 첫 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 38 |       2 |         2 | 두 번째 게시글의 두 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 39 |       2 |         1 | 두 번째 게시글의 세 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 40 |       2 |         2 | 두 번째 게시글의 네 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 41 |       3 |         2 | 세 번째 게시글의 첫 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 42 |       3 |         1 | 세 번째 게시글의 두 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 43 |       3 |         2 | 세 번째 게시글의 세 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 44 |       3 |         1 | 세 번째 게시글의 네 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 45 |       4 |         1 | 네 번째 게시글의 첫 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 46 |       4 |         2 | 네 번째 게시글의 두 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 47 |       4 |         1 | 네 번째 게시글의 세 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
| 48 |       4 |         2 | 네 번째 게시글의 네 번째 댓글입니다.                | 2024-09-13 05:22:51 |      NULL |
+----+---------+-----------+-----------------------------------------------------+---------------------+-----------+