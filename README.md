# Code Learner — React · Node.js · MySQL 풀스택 학습 프로젝트

웹 개발에서 자주 사용되는 **인증, CRUD, DB 연동, 클라이언트–서버 분리 구조**를 직접 구현하며 전체 흐름을 학습하기 위한 개인 프로젝트입니다.
프론트엔드와 백엔드를 분리된 디렉터리에서 관리하며, 실제 서비스 구조에 가까운 형태를 지향합니다.

---

## 핵심 기능 (5)

1. **회원가입 / 로그인 (JWT 인증)**
    - bcrypt를 이용한 비밀번호 해싱
    - JWT 발급 및 인증 미들웨어 적용

2. **게시글 CRUD**
    - 게시글 생성 / 조회 / 수정 / 삭제
    - MySQL 기반 데이터 저장

3. **인증 기반 접근 제어**
    - 로그인 사용자만 접근 가능한 기능 분리
    - 클라이언트 라우트 가드 구현

4. **React 컴포넌트 기반 UI**
    - 기능 단위 컴포넌트 분리
    - 상태에 따른 조건부 렌더링

5. **Client–Server 분리 구조**
    - axios를 통한 API 통신
    - CORS 설정을 포함한 로컬 개발 환경 구성

---

## Tech Stack

### Client

- React (CRA)
- JavaScript (ES6+)
- axios
- CSS

### Server

- Node.js
- Express
- MySQL (mysql2)
- JWT (jsonwebtoken)
- bcryptjs
- cors

### Dev / Tooling

- Git / GitHub
- npm

---

## 실행 방법

### 1) Clone

```bash
git clone https://github.com/shw4455/code-learner
cd code-learner
```

### 2) Install

본 프로젝트는 **client / server 분리 구조**로, 각 디렉터리에서 의존성을 개별 관리합니다.

```bash
cd apps/client
npm install

cd ../server
npm install
```

## Environment Variables

### server

- `server/.env.example` 참고하여 `.env` 생성

### client

- `client/.env.example` 참고하여 `.env` 생성

### 4) Run

#### 데이터 입력

mysql -u root -p
USE code_learner_db;

SOURCE docs/seed.sql;

#### 서버 실행

```bash
cd apps/server
npm start
```

#### 클라이언트 실행 (다른 터미널)

```bash
cd apps/client
npm start
```

- Client: [http://localhost:3000](http://localhost:3000)
- Server: [http://localhost:3001](http://localhost:3001)

---

## 폴더 구조 요약

```txt
code-learner
├─ apps
│  ├─ client        # React UI, 상태 관리, API 호출
│  │  └─ src
│  └─ server        # Express API, 인증, DB 접근
│     └─ src
│        ├─ routes
│        ├─ controllers
│        ├─ services
│        └─ middleware
├─ docs             # DB 설계, SQL 문서
└─ README.md
```

### 구조 기준

- **Client**: UI 렌더링, 사용자 입력 처리, API 호출
- **Server**: 인증/권한, 비즈니스 로직, 데이터베이스 트랜잭션

---

## API 요약 (대표 Endpoint)

### Auth

- `POST /signup` : 회원가입
- `POST /login` : 로그인 (JWT 발급)

### Post

- `GET /posts` : 게시글 목록 조회
- `POST /posts` : 게시글 생성 (인증 필요)
- `PUT /posts/:id` : 게시글 수정
- `DELETE /posts/:id` : 게시글 삭제

### Response 예시

```json
{
    "success": true,
    "data": {
        "id": 1,
        "createdAt": "2026-02-03T00:00:00.000Z"
    }
}
```

---

## Troubleshooting (실제 경험 기반)

### 1) client / server 분리 후 CORS 오류

- **증상**: 브라우저에서 API 요청 실패
- **원인**: Origin 불일치로 인한 CORS 차단
- **해결**: Express에 `cors` 미들웨어 적용, 클라이언트 요청 주소 명확화

### 2) JWT 검증 누락으로 보호 페이지 접근 가능

- **증상**: 로그인 없이 접근 가능
- **원인**: 서버 및 클라이언트 인증 체크 미흡
- **해결**: JWT 인증 미들웨어 추가 및 React 라우트 가드 구현

### 3) 비밀번호 평문 저장 문제

- **증상**: 보안 취약
- **원인**: 초기 구현 단계에서 암호화 미적용
- **해결**: bcrypt 적용 후 해시 저장 및 비교 로직 구현

---

## 내가 한 일 (면접용 요약)

- React + Express + MySQL 기반 풀스택 기본 구조 직접 설계 및 구현
- JWT 인증 흐름(발급–검증–인가)을 코드 레벨에서 적용
- client / server 분리 구조를 통해 역할과 책임 경계 명확화
- 실제 개발 과정에서 발생한 문제를 기록하고 개선

---

본 프로젝트는 **학습 목적의 개인 프로젝트**이며,
이후 모노레포 정리, 환경변수 완전 분리, 서버 계층 구조 고도화를 목표로 개선 중입니다.
