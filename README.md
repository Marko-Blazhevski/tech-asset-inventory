# 🤖 Tech asset management system

A professional full-stack application for real-time tech asset inventory management, built with a **Nest JS** REST API, a **PostgreSQL** database, and a modern **React** standalone frontend.

---

## 🛠 Prerequisites

Ensure your environment meets these requirements before starting:
* **Docker & Docker Compose** (**Optional**): For containerized database management. You can download it at https://www.docker.com/.
* **Node.js (v24+)**: Required for Angular development. You can download it at https://nodejs.org/en/download.

---

## 🚀 Quick Start Guide

To run the full system, it is recommended to open three separate terminal windows to monitor each service's logs.

### 1. Database (Docker)
We use Docker to ensure a consistent database environment without requiring a local PostgreSQL installation.

```bash
# From the project root (./tech-asset-inventory)
docker-compose up -d
```

### 1. Database (Without Docker)
We can also start this application without docker by connecting to the local PostgreSQL on your machine.
In the .env file, change the database connection settings to match your local PostgreSQL configuration.

```bash
# If you prefer to change the file with terminal use the nano command if you have it installed, or go and open the file in this path
nano ./inventory-backend/.env
```

### 2. Backend (Nest JS)
The API layer handles business logic, data validation, and communication with the database. It is built using Nest JS, a progressive Node.js framework for building efficient and scalable server-side applications.

```bash
# 1. Navigate to the backend directory
cd inventory-backend

# 2. Install dependencies via npm
npm install

# 3. Copy .env.example to .env and update the database connection settings if you are not using docker
cp .env.example .env

# 4. Then run the backend, but make sure the database is set up correctly before starting the backend
npm run start:dev
```

### 3. Frontend (React)
The user interface features reactive forms, dynamic filtering, and a responsive Bootstrap-based design.

```bash
# 1. Navigate to the frontend directory
cd inventory-frontend

# 2. Install dependencies (First time only)
npm install

# 3. Launch the development server
npm run start-dev
```

### 4. Stopping the System
To stop the database and clean up Docker containers:

```bash
docker-compose down
```
