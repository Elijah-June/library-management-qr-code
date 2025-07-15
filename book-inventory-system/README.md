# Book Inventory System (PERN + TailwindCSS)

A secure, modular library/book inventory system with camera scanning, dashboard, and PostgreSQL backend.

## Features
- Register books via barcode/QR/ID (camera scan or auto-generate)
- Borrow/return books with camera scan
- Overdue alerts for staff
- Dashboard with live stats
- Secure JWT auth, input validation, rate limiting
- DRY, modular codebase

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, react-router-dom, react-toastify, react-qr-barcode-scanner
- **Backend:** Node.js, Express, PostgreSQL, JWT, bcryptjs, Helmet, CORS, express-rate-limit

## Project Structure
```
/book-inventory-system
│
├── /client      (React Frontend)
├── /server      (Express Backend)
├── /database    (PostgreSQL schema & seed)
├── .env         (Backend env vars)
├── README.md
```

## Getting Started

### 1. Database
- Edit `database/schema.sql` and `seed.sql` as needed
- Create your DB and run:
  ```sh
  psql -U <user> -d <db> -f schema.sql
  psql -U <user> -d <db> -f seed.sql
  ```

### 2. Backend
- `cd server`
- Edit `.env` for your DB connection
- `npm install`
- `node server.js`

### 3. Frontend
- `cd client`
- `npm install`
- `npm run dev`

---

**Start coding your features!**