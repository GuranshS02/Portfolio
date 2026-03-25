# Guransh Singh — Portfolio

Full-stack MERN portfolio with React + Vite + Tailwind CSS frontend and Express + MongoDB Atlas backend.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
# Root (concurrently)
npm install

# Client
cd client && npm install

# Server
cd ../server && npm install
```

### 2. Configure environment variables

**Server** — copy `.env.example` to `.env`:
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Client** — create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run in development

```bash
# From root — runs both client and server
npm run dev
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:5000
- Admin:    http://localhost:5173/admin

---

## 📁 Project Structure

```
portfolio/
├── client/                   ← React + Vite + Tailwind
│   ├── public/
│   │   └── images/           ← Project screenshots + your photo
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Projects.jsx
│       │   ├── Blog.jsx
│       │   ├── Analytics.jsx
│       │   ├── Contact.jsx
│       │   └── Footer.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   └── Admin.jsx
│       └── utils/
│           ├── api.js
│           └── projects.js
└── server/                   ← Express + MongoDB
    ├── models/
    │   ├── Contact.js
    │   ├── Blog.js
    │   └── Analytics.js
    ├── routes/
    │   ├── contact.js
    │   ├── blog.js
    │   └── analytics.js
    └── index.js
```

---

## 🌐 API Endpoints

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| POST   | /api/contact              | Save contact message     |
| GET    | /api/contact              | Get all messages (admin) |
| PATCH  | /api/contact/:id/read     | Mark message as read     |
| DELETE | /api/contact/:id          | Delete message           |
| GET    | /api/blog                 | Get all blog posts       |
| POST   | /api/blog                 | Create new post          |
| DELETE | /api/blog/:id             | Delete post              |
| POST   | /api/analytics/visit      | Track page visit         |
| POST   | /api/analytics/click      | Track project click      |
| GET    | /api/analytics            | Get analytics summary    |

---

## ☁️ Deployment

### MongoDB Atlas
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Add database user and whitelist `0.0.0.0/0` for IP access
3. Copy connection string into `server/.env`

### Vercel (Frontend)
```bash
cd client
npm run build
# Deploy dist/ to Vercel — set VITE_API_URL to your backend URL
```

### Vercel / Railway (Backend)
- Set all environment variables in the dashboard
- Entry point: `server/index.js`
- Build command: none (Node.js ESM)

---

## 🔧 Updating Projects

Edit `client/src/utils/projects.js` to add/update projects.  
Add project images to `client/public/images/`.

## ✍️ Adding Blog Posts

Visit `/admin` → Blog tab → write and publish directly from the dashboard.  
Posts are stored in MongoDB and displayed live on the portfolio.
