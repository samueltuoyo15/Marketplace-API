# Marketplace API

## Overview
A high-performance e-commerce backend architecture built with **NestJS**, **TypeScript**, and **TypeORM**. This system implements a robust **Role-Based Access Control (RBAC)** model for buyers and sellers, utilizing **PostgreSQL** for persistence and **JWT** for stateless authentication.

## Features
- **NestJS**: Modular architecture for scalable enterprise applications.
- **TypeORM**: Advanced Data Mapper pattern for PostgreSQL database management.
- **Passport & JWT**: Secure authentication flow with customized strategy implementation.
- **RBAC**: Specialized decorators and guards for `buyer`, `seller`, and `admin` roles.
- **Argon2**: Industry-standard password hashing and security.
- **Docker Integration**: Pre-configured containerization for the database environment.

## 🛠 Technologies Used
| Technology | Purpose |
| :--- | :--- |
| **TypeScript** | Type-safe development |
| **NestJS** | Framework architecture |
| **PostgreSQL** | Relational database |
| **TypeORM** | Object-Relational Mapping |
| **Docker** | Environment orchestration |
| **Argon2** | Cryptographic hashing |

---

## Project Setup

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) & Docker Compose
- [pnpm](https://pnpm.io/) (optional, but recommended)

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/samueltuoyo15/Marketplace-API
cd marketplace-place-api
```

Install dependencies:
```bash
npm install
# or
pnpm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=8080
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=marketplace
JWT_SECRET_KEY=your_complex_secret_key_here
JWT_EXPIRES_IN=3600s
```

### 4. Database Setup
Start the PostgreSQL container:
```bash
docker-compose up -d
```

### 5. Running the Application
```bash
# Development mode
npm run start:dev
```

---

## Authentication & RBAC Enforcement

### JWT Implementation
The API uses **Stateless JWT Authentication**. Upon successful login or registration, the server issues a signed JWT. This token must be included in the `Authorization` header as a Bearer token for protected routes.

### RBAC (Role-Based Access Control)
Role enforcement is handled via a combination of:
1.  **Roles Decorator**: A custom decorator (`@Roles('admin', 'seller')`) used to attach required roles to specific routes.
2.  **Roles Guard**: A global or method-level guard that:
    -   Extracts the JWT from the request.
    -   Decodes the user's role.
    -   Compares it against the metadata set by the `@Roles` decorator.
    -   Throws a `403 Forbidden` exception if the role is insufficient.

### Sample JWT Payload Structure
```json
{
  "user_id": 10,
  "role": "buyer",
  "iat": 1734523053,
  "exp": 1734526653
}
```

---

## API Endpoints & Usage

### Base URL
`http://localhost:8080`

### 1. Authentication
#### Register a New User
```bash
curl -X POST http://localhost:8080/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "role": "buyer"
}'
```

#### Login
```bash
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "user@example.com",
  "password": "SecurePassword123"
}'
```

### 2. Products (Seller Operations)
#### Create a Product
Requires `seller` role.
```bash
curl -X POST http://localhost:8080/products \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "Professional Camera",
  "price": 1200.50
}'
```

#### List All Products
Public access.
```bash
curl -X GET http://localhost:8080/products
```

### 3. Orders (Buyer Operations)
#### Place an Order
Requires `buyer` role.
```bash
curl -X POST http://localhost:8080/orders \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "productId": "1",
  "quantity": 2
}'
```

#### View My Orders
Requires authentication.
```bash
curl -X GET http://localhost:8080/orders/me \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Author
**Samuel Tuoyo**
- GitHub: [@samueltuoyo15](https://github.com/samueltuoyo15)
- Twitter: [@TuoyoSamuel](https://x.com/TuoyoSamuel)

---

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

