# 데이터베이스 접속
mysql -u root -p

# 데이터베이스에 접근(선택)
USE cmnt_test;

# 테이블 목록 표시
SHOW TABLES;

# 테이블 설계 정보 확인


# 테이블 내의 전체 데이터 조회

---
+---------------------------+
| Tables_in_code_learner_db |
+---------------------------+
| posts                     |
+---------------------------+
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int          | NO   | PRI | NULL    | auto_increment |
| title      | varchar(100) | NO   |     | NULL    |                |
| author     | varchar(50)  | NO   |     | NULL    |                |
| content    | text         | YES  |     | NULL    |                |
| created_at | date         | NO   |     | NULL    |                |
| views      | int          | YES  |     | 0       |                |
| likes      | int          | YES  |     | 0       |                |
+------------+--------------+------+-----+---------+----------------+