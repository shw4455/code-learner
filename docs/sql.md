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
  [column3] [datatype] [option],
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
    ('네 번째 게시글', '신사임당', '멋진 그림 감상', '2023-11-25', 90, 18),
    ('다섯 번째 게시글', '세종대왕', '한글의 우수성', '2023-11-26', 150, 30),
    ('여섯 번째 게시글', '율곡 이이', '깊이 있는 사색', '2023-11-27', 70, 12),
    ('일곱 번째 게시글', '정약용', '실용적인 발명품', '2023-11-28', 110, 22),
    ('여덟 번째 게시글', '허준', '건강한 삶', '2023-11-29', 130, 28),
    ('아홉 번째 게시글', '김구', '독립운동 이야기', '2023-11-30', 180, 35),
    ('열 번째 게시글', '안중근', '의로운 죽음', '2023-12-01', 160, 32),
    ('열한 번째 게시글', '윤동주', '아름다운 시', '2023-12-02', 140, 27);

        ('첫 번째 게시글', '홍길동', '간단한 소개글입니다.', '2023-11-22', 100, 20),
    ('두 번째 게시글', '이순신', '흥미로운 이야기', '2023-11-23', 80, 15),

# 테이블 내의 전체 데이터 조회
SELECT * from [조회할 table명];