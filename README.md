# School of Engineering and Technology (SoET) Website

Welcome to the official repository for the **School of Engineering and Technology (SoET)**, Samrat Vikramaditya Vishwavidyalaya, Ujjain. 

This repository houses the modern, decoupled **MERN stack** (MongoDB, Express, React, Node.js) implementation of the college website. It was recently migrated from a monolithic static HTML/CSS structure into a dynamic, highly performant web application.

---

## 🏗️ Architecture

The project is structured as a fully decoupled monorepo:

### 1. Frontend (`/soet-client`)
- **Framework:** React + Vite
- **Routing:** React Router v6
- **Styling:** Vanilla CSS (Global Styles)
- **Security:** Cloudflare Turnstile (CAPTCHA)
- **Hosting Target:** Cloudflare Pages (Static Edge Network)

### 2. Backend API (`/soet-api`)
- **Framework:** Node.js + Express
- **Database:** MongoDB Atlas (Mongoose ORM)
- **Storage:** Cloudflare R2 via AWS SDK v3 (S3 API)
- **Security:** Helmet, Express Rate Limiter, strict CORS, JWT Authentication
- **Hosting Target:** Render (Web Service)

---

## 🚀 Features & Upgrades
- **Dynamic Content Management:** Admins can securely log in via `/admin-login` to issue notices, syllabus updates, and manage student enquiries.
- **Direct-to-R2 Uploads:** The backend issues presigned URLs, allowing the browser to upload heavy files (PDFs, images) directly to Cloudflare R2, completely bypassing backend rate limits and bandwidth.
- **Enhanced Security:** Memory-stored JWTs (mitigating XSS), strict function-based CORS whitelisting, and Cloudflare Turnstile verification on all public POST routes.
- **SEO Optimized:** Retains exact legacy DOM semantics, semantic HTML5, and native meta tags, fully supported by Vite's build process.

---

## 💻 Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- A MongoDB Atlas connection string (or local MongoDB)
- Cloudflare R2 and Turnstile credentials (for testing full E2E flow)

### 1. Start the Backend (API)
```bash
cd soet-api
npm install
# Configure your .env (see .env.example)
npm run dev
```
The API server will run at `http://localhost:5000`.

### 2. Start the Frontend (Client)
```bash
cd soet-client
npm install
# Configure your .env (see .env.example)
npm run dev
```
The Vite dev server will run at `http://localhost:5173`.

---

## 🔐 Environment Variables

You will need to create a `.env` file in both directories. Reference `.env.example` where applicable.

**`soet-client/.env`**
```env
VITE_API_URL=http://localhost:5000
VITE_TURNSTILE_SITE_KEY=<cloudflare_public_key>
```

**`soet-api/.env`**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=<your_mongodb_atlas_uri>
CLIENT_ORIGINS=http://localhost:5173,https://soet.ac.in
JWT_SECRET=<secure_random_string>
TURNSTILE_SECRET_KEY=<cloudflare_secret_key>
R2_ACCESS_KEY_ID=<cloudflare_r2_key>
R2_SECRET_ACCESS_KEY=<cloudflare_r2_secret>
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
R2_BUCKET_NAME=soet-assets
```

---

## 🚢 Deployment

1. **Frontend (Cloudflare Pages):** Connect the repository to Cloudflare Pages, set the root directory to `soet-client`, build command `npm run build`, and output directory `dist`.
2. **Backend (Render):** Connect the repository as a Web Service, set the root directory to `soet-api`, build command `npm install`, start command `npm start`. Ensure `0.0.0.0/0` is whitelisted in MongoDB Atlas for Render's dynamic IPs.
3. **DNS Cutover:** Create a CNAME for `assets.soet.ac.in` pointing to the R2 bucket, and map the root domain (`@` and `www`) to the Cloudflare Pages deployment.

---

## 📄 License
&copy; 2026-27 School of Engineering and Technology, Samrat Vikramaditya Vishwavidyalaya Ujjain. All rights reserved.
