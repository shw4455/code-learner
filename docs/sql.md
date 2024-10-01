# 데이터베이스 접속
mysql -u root -p
# 데이터베이스 목록 표시
SHOW databases;

# 데이터베이스 생성
CREATE DATABASE [DB명];

# 데이터베이스 삭제
DROP DATABASE [삭제할 DB명];

# 데이터베이스에 접근(선택)
USE [선택할 DB명];

# 테이블 설계 정보 확인
DESC [테이블명];

# 테이블 생성
CREATE TABLE [table명] (
  [column1] [datatype] [option],
  [column2] [datatype] [option],
  ...
  PRIMARY KEY ([PK로 지정할 column명]),
  FOREIGN KEY ([FK로 지정할 column명]) REFERENCES [참조할 table명] ([참조할 PK명])
);

CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    content TEXT,
    created_at DATE NOT NULL,
    views INT DEFAULT 0,
    likes INT DEFAULT 0
);

# 테이블 목록 표시
SHOW TABLES;

# 데이터 삽입
INSERT INTO posts (title, author, content, created_at, views, likes)
VALUES
    ('세 번째 게시글', '강감찬', '유용한 정보 공유', '2023-11-24', 120, 25),
    ('열한 번째 게시글', '윤동주', '아름다운 시', '2023-12-02', 140, 27);

# 테이블 내의 전체 데이터 조회
SELECT * from [조회할 table명];