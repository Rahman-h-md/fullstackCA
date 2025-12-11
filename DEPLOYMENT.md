# Deployment Guide for SwasthyaSetu

## 1. Database (MongoDB Atlas)
1.  Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a **Free Cluster**.
3.  In "Network Access", allow access from anywhere (`0.0.0.0/0`) or specific IPs.
4.  In "Database Access", create a database user.
5.  Get connection string: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/swasthya_setu?retryWrites=true&w=majority`.
6.  Save this for the Backend deployment.

## 2. Backend (Render / Railway)
We recommend **Render** for free Node.js hosting.

1.  Push your code to GitHub.
2.  Sign up at [Render](https://render.com).
3.  Click **New +** -> **Web Service**.
4.  Connect your repository.
5.  **Settings**:
    - **Root Directory**: `server`
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
6.  **Environment Variables**:
    - `MONGO_URI`: (Paste connection string from Step 1)
    - `JWT_SECRET`: (Set a strong secret)
    - `NODE_ENV`: `production`
7.  Deploy! Copy the provided URL (e.g., `https://swasthyasetu-api.onrender.com`).

## 3. Frontend (Vercel)
1.  Sign up at [Vercel](https://vercel.com).
2.  Click **Add New Project**.
3.  Import your GitHub repository.
4.  **Settings**:
    - **Root Directory**: `client`
    - **Framework Preset**: `Vite`
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
5.  **Environment Variables** (Important):
    - You must update your API base URL in the frontend code to point to your deployed backend.
    - Create a `.env.production` in `client/` or set VITE env var in Vercel.
    - `VITE_API_URL`: `https://swasthyasetu-api.onrender.com/api`
6.  Deploy!

## 4. Updates for Production
In `client/src/services/api.js`, update the baseURL to use the environment variable:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
   // ...
});
```

In `client/src/pages/BloodBank.jsx` (Socket.io):
```javascript
const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000');
```
