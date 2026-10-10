# School of Engineering and Technology (SoET) — Official Website

Full-stack MERN web application for the **School of Engineering & Technology, Samrat Vikramaditya Vishwavidyalaya, Ujjain**.

---

## 🏗️ Architecture

| Layer | Stack |
|-------|-------|
| Frontend | React 18 + Vite + React Router v7 |
| Backend API | Node.js 20 + Express 5 + Socket.IO 4 |
| Database | MongoDB (Mongoose ODM) |
| Real-time | Socket.IO (WebSocket) |
| Auth | JWT (Bearer token / cookie) |
| File Storage | Multer (local) / Cloudflare R2 (production) |
| Security | Helmet, CORS, express-rate-limit, Zod validation |

### Monorepo Structure

```
School-Of-Engineering-and-Technology-Official-Website/
├── soet-api/              # Express REST API + Socket.IO
│   ├── src/
│   │   ├── app.js          # Express app (middleware stack)
│   │   ├── server.js       # HTTP server + Socket.IO init
│   │   ├── socket.js       # Socket.IO event handlers
│   │   ├── config/
│   │   │   ├── cors.js     # CORS whitelist
│   │   │   └── db.js       # MongoDB connection
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # auth.js, upload.js, validate.js, turnstile.js
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   └── utils/          # validators.js, audit.js, r2.service.js
│   ├── uploads/            # Local file storage (dev only)
│   └── package.json
│
├── soet-client/           # React + Vite SPA
│   ├── src/
│   │   ├── context/        # AuthContext, NotificationContext
│   │   ├── components/     # Layout, ProtectedRoute, NotificationBell, etc.
│   │   ├── pages/          # All route-level components
│   │   └── styles/         # Global CSS
│   └── package.json
│
├── frontend/              # Legacy static HTML (archived)
└── backend/               # Legacy PHP backend (archived)
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js ≥ 20
- MongoDB (local or Atlas)
- (Optional) Cloudflare R2 bucket + Turnstile keys for full production parity

### 1. Backend API

```bash
cd soet-api
npm install
cp .env.example .env     # fill in your values
npm run dev              # starts on http://localhost:5000
```

### 2. Frontend (React)

```bash
cd soet-client
npm install
cp .env.example .env     # set VITE_API_URL
npm run dev              # starts on http://localhost:5173
```

---

## 🔐 Environment Variables

### `soet-api/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default `5000`) |
| `MONGODB_URI` | **Yes** | MongoDB connection string |
| `JWT_SECRET` | **Yes** | Secret for signing JWTs (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token expiry (default `7d`) |
| `FRONTEND_URL` | No | Allowed CORS origin (default `http://localhost:5173`) |
| `NODE_ENV` | No | `development` or `production` |
| `R2_ACCOUNT_ID` | No | Cloudflare R2 account ID (production uploads) |
| `R2_ACCESS_KEY_ID` | No | Cloudflare R2 key ID |
| `R2_SECRET_ACCESS_KEY` | No | Cloudflare R2 secret |
| `R2_BUCKET_NAME` | No | R2 bucket name |
| `CLOUDFLARE_TURNSTILE_SECRET` | No | Turnstile secret key (form bot protection) |

### `soet-client/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend base URL (default `http://localhost:5000`) |
| `VITE_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key |

---

## 🌱 Seed & Test Data

```bash
# Seed 30 fake verified students (for TPO dashboard testing)
cd soet-api
node src/seeds/students.seed.js

# Or create an admin directly in MongoDB:
db.users.insertOne({
  name: "Admin",
  email: "admin@soet.ac.in",
  password: "<bcrypt-hash>",
  role: "admin",
  status: "approved"
})
```

---

## 📡 API Reference

All routes are prefixed with `/api`. Authenticated routes require:
```
Authorization: Bearer <jwt_token>
```

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | Public | Register (student/hod/teacher/alumni) |
| POST | `/auth/login` | Public | Login → returns JWT |
| POST | `/auth/logout` | Public | Clear session |
| GET | `/auth/me` | 🔐 Any | Get own user object |

### Admin
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/admin/users` | 🔐 Admin | List all users (filter by role/status) |
| PUT | `/admin/users/:id/status` | 🔐 Admin | Approve / reject / block user |
| PUT | `/admin/users/:id/chat-block` | 🔐 Admin | Block/unblock user from chat |
| DELETE | `/admin/users/:id` | 🔐 Admin | Delete user |
| POST | `/admin/users/tpo` | 🔐 Admin | Create a TPO account |
| GET | `/admin/enquiries` | 🔐 Admin | View contact form submissions |
| POST | `/admin/uploads/presign` | 🔐 Admin | Get R2 presigned upload URL |

### Branches
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/branches` | Public | List all branches |
| POST | `/admin/branches` | 🔐 Admin | Create branch |
| PUT | `/admin/branches/:id` | 🔐 Admin | Update branch |
| DELETE | `/admin/branches/:id` | 🔐 Admin | Delete branch |

### Syllabus
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/syllabus` | 🔐 All | Get syllabi (filtered by own branch for students/teachers) |
| POST | `/syllabus` | 🔐 Admin, HOD | Upload syllabus PDF |
| PUT | `/syllabus/:id` | 🔐 Admin, HOD | Update syllabus |
| DELETE | `/syllabus/:id` | 🔐 Admin, HOD | Delete syllabus |

### Announcements
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/announcements` | Public | Get published announcements |
| POST | `/announcements` | 🔐 Admin, HOD, TPO | Create announcement |
| PUT | `/announcements/:id` | 🔐 Admin, HOD, TPO | Edit announcement |
| DELETE | `/announcements/:id` | 🔐 Admin, HOD | Delete announcement |
| PUT | `/announcements/:id/pin` | 🔐 Admin, HOD | Toggle pin |

### Student
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/student/profile` | 🔐 Student (approved) | Get own profile |
| POST | `/student/profile` | 🔐 Student (approved) | Submit profile |
| GET | `/student/portfolio` | 🔐 Student (approved) | Get portfolio data |
| POST | `/student/portfolio/academics` | 🔐 Student | Add academic record |
| POST | `/student/portfolio/achievements` | 🔐 Student | Add achievement |

### Staff (Admin + HOD)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/staff/students/pending` | 🔐 Admin, HOD | List pending students |
| GET | `/staff/students/verified` | 🔐 Admin, HOD | List verified students |
| PUT | `/staff/students/:id/verify` | 🔐 Admin, HOD | Verify a student |
| PUT | `/staff/students/bulk-verify` | 🔐 Admin, HOD | Bulk verify students |

### TPO
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/tpo/students` | 🔐 TPO, Admin, HOD | Paginated/filtered student list |
| GET | `/tpo/students/:userId` | 🔐 TPO, Admin, HOD | Full student detail |

### Alumni
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/alumni/profile` | 🔐 Alumni | Get own alumni profile |
| POST | `/alumni/profile` | 🔐 Alumni | Submit/update profile |
| GET | `/alumni/directory` | 🔐 All | Alumni directory (approved only) |
| GET | `/alumni/jobs` | 🔐 All | Job referrals |
| POST | `/alumni/jobs` | 🔐 Alumni (approved) | Post job referral |
| GET | `/alumni/mentorship` | 🔐 Student, Alumni | Mentorship requests |
| POST | `/alumni/mentorship` | 🔐 Student (approved) | Send mentorship request |
| PUT | `/alumni/mentorship/:id` | 🔐 Alumni (approved) | Accept/decline request |
| GET | `/alumni/stories` | Public | Published success stories |
| POST | `/alumni/stories` | 🔐 Alumni (approved) | Submit success story |
| PUT | `/alumni/stories/:id/status` | 🔐 Admin | Approve/reject story |

### Notifications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/notifications` | 🔐 Any | Get own notifications |
| PUT | `/notifications/:id/read` | 🔐 Any | Mark as read |
| POST | `/notifications/send` | 🔐 Admin, HOD, TPO | Send a notification |

### Chat
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/chat/rooms` | 🔐 Any | List accessible chat rooms |
| GET | `/chat/rooms/:roomId/messages` | 🔐 Any | Message history (paginated) |
| DELETE | `/chat/messages/:messageId` | 🔐 Owner or Admin | Delete a message |
| POST | `/chat/upload` | 🔐 Any | Upload file attachment |

### Audit Logs
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/audit-logs` | 🔐 Admin | Get audit logs (filter by actor/action/date) |

### Misc
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/enquiries` | Public + Turnstile | Contact form submission |
| POST | `/newsletter` | Public + Turnstile | Newsletter subscription |
| GET | `/health` | Public | Server health check |

---

## 🔑 Role–Permission Matrix

| Feature | Student | Teacher | HOD | Admin | TPO | Alumni |
|---------|:-------:|:-------:|:---:|:-----:|:---:|:------:|
| View public pages | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Register / Login | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Complete own profile | ✅ | – | – | – | – | ✅ |
| View own branch syllabus | ✅ | ✅ | – | – | – | – |
| View all syllabi | – | – | ✅ | ✅ | – | – |
| Upload / edit syllabus | – | – | ✅ | ✅ | – | – |
| View announcements | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create announcement | – | – | ✅ | ✅ | ✅ (placement only) | – |
| Verify students | – | – | ✅ | ✅ | – | – |
| View student list (TPO style) | – | – | ✅ | ✅ | ✅ | – |
| Export student data (xlsx/csv) | – | – | – | – | ✅ | – |
| Manage users | – | – | – | ✅ | – | – |
| Create TPO account | – | – | – | ✅ | – | – |
| View audit logs | – | – | – | ✅ | – | – |
| Post job referrals | – | – | – | – | – | ✅ |
| View job referrals | ✅ | – | – | – | ✅ | ✅ |
| Send mentorship request | ✅ | – | – | – | – | – |
| Accept mentorship request | – | – | – | – | – | ✅ |
| View alumni directory | ✅ | – | ✅ | ✅ | ✅ | ✅ |
| Submit success story | – | – | – | – | – | ✅ |
| Approve success story | – | – | – | ✅ | – | – |
| Send notifications | – | – | ✅ | ✅ | ✅ | – |
| Chat (own eligible rooms) | ✅ | ✅ | ✅ | ✅ | – | ✅ |
| Delete any chat message | – | – | – | ✅ | – | – |
| Block user from chat | – | – | – | ✅ | – | – |
| Chat moderation page | – | – | – | ✅ | – | – |

---

## 💬 Chat Room Access

| Room Type | Student | Teacher | HOD | Admin | TPO | Alumni |
|-----------|:-------:|:-------:|:---:|:-----:|:---:|:------:|
| Branch Room (own) | ✅ (verified) | ✅ (own branch) | ✅ (all) | ✅ (all) | – | – |
| Branch Room (other) | ❌ | ❌ (other branch) | ✅ | ✅ | – | – |
| Teachers Group | – | ✅ | ✅ | ✅ | – | – |
| HOD Group | – | – | ✅ | ✅ | – | – |
| Administrative Group | – | – | ✅ | ✅ | – | – |
| Alumni Chat | – | – | ✅ | ✅ | – | ✅ |

---

## 🔒 Security Notes

- **JWT** stored in memory (not localStorage) to mitigate XSS
- **Helmet** sets secure HTTP headers on every response
- **CORS** uses an explicit origin whitelist (not `*`)
- **Rate limiting**: 100 req/15min globally; 20 POST/15min on API
- **File uploads**: MIME-type and extension validation; 5–20MB limits
- **HTML sanitization**: `sanitize-html` on announcement bodies
- **IDOR protection**: student profile routes use `req.user._id` only (never a URL param)
- **Admin-only**: all destructive operations (delete user, delete message) require `admin` role
- **Blocked users**: checked on every authenticate() call — no stale tokens

---

## 🧪 Test Checklist

See [TEST_CHECKLIST.md](./TEST_CHECKLIST.md) for the full manual test plan covering all 6 roles.

---

## 📦 Deployment

### Backend → Render

1. Set all environment variables in Render dashboard
2. Build command: `npm install`
3. Start command: `npm start`
4. Add MongoDB Atlas connection IP whitelist for Render's IPs

### Frontend → Cloudflare Pages

1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_API_URL` environment variable to Render backend URL

---

## 📂 Legacy Frontend

The `/frontend` directory contains the original static HTML/CSS site. It is kept for reference and SEO semantic parity. All new development should go in `soet-client`.
