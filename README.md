# avyastore — Luxury Leather Purses & Accessories E-Commerce Platform

A production-style full-stack MERN e-commerce platform for selling premium handcrafted leather purses, handbags, wallets, and accessories for men and women in India.

---

## 🏛️ Three-Application Architecture

The platform is split into **three completely independent applications** that share a single backend API:

| App | Port | Purpose |
| :--- | :--- | :--- |
| `frontend/` | **5173** | Customer-facing e-commerce storefront |
| `admin/` | **5174** | Standalone admin management portal |
| `backend/` | **5000** | Central REST API (shared by both) |

Both `frontend` and `admin` communicate with the **same** `backend`. There is no duplication of business logic.

```text
SAAJ/
├── frontend/                   # Customer React + Vite SPA (Port 5173)
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/         # Navbar, Footer, StoreLayout
│   │   ├── constants/
│   │   │   └── config.js       # Centralized brand, currency, nav links
│   │   ├── pages/
│   │   │   └── public/         # HomePage, ProductsPage, AboutPage, ContactPage, NotFoundPage
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx   # Customer-only route declarations
│   │   ├── services/
│   │   │   └── api.js          # Axios client → http://localhost:5000/api
│   │   ├── App.jsx
│   │   └── index.css           # Tailwind + luxury leather design tokens
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── admin/                      # Admin React + Vite SPA (Port 5174)
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/         # AdminSidebar, AdminHeader, AdminLayout
│   │   ├── constants/
│   │   │   └── config.js       # Admin portal config, nav links
│   │   ├── pages/              # Dashboard, Products, Categories, Orders, Customers, Reviews, Settings
│   │   ├── routes/
│   │   │   └── AdminRoutes.jsx # Admin-only route declarations
│   │   ├── services/
│   │   │   └── api.js          # Axios client → http://localhost:5000/api
│   │   ├── App.jsx
│   │   └── index.css           # Tailwind with admin design tokens
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── backend/                    # Node.js + Express REST API (Port 5000)
│   ├── config/
│   │   ├── constants.js        # Server-side brand & order/payment enumerations
│   │   └── db.js               # Mongoose connection with event listeners
│   ├── middleware/
│   │   ├── errorHandler.js     # Uniform JSON error responses
│   │   └── notFound.js         # 404 handler for unknown routes
│   ├── routes/
│   │   ├── healthRoutes.js     # GET /api/health
│   │   └── index.js            # Central API router hub
│   ├── app.js                  # Express app, CORS (allows 5173 + 5174), Morgan logger
│   ├── server.js               # Boot: DB connect → HTTP listen
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md
```

---

## 🏷️ Brand Configuration (Single Source of Truth)

The temporary brand name **"KOSHA"** is isolated:

| Location | File | Variable |
| :--- | :--- | :--- |
| Frontend | [`frontend/src/constants/config.js`](frontend/src/constants/config.js) | `BRAND_CONFIG.name` |
| Admin | [`admin/src/constants/config.js`](admin/src/constants/config.js) | `ADMIN_CONFIG.brandName` |
| Backend | [`backend/config/constants.js`](backend/config/constants.js) | `BRAND_CONFIG.brandName` |

---

## 🚀 Running the Platform

Run all three apps **in separate terminals**.

### 1. Start the Backend (required first)

```bash
cd backend
npm run dev
```

Expected output:
```
[MongoDB] Connected successfully: 127.0.0.1/kosha_ecommerce
====================================================
  KOSHA E-COMMERCE BACKEND RUNNING
  Mode: development
  Port: 5000
  Health Check: http://localhost:5000/api/health
====================================================
```

Health check: [`http://localhost:5000/api/health`](http://localhost:5000/api/health)

---

### 2. Start the Customer Frontend

```bash
cd frontend
npm run dev
```

Storefront URL: [`http://localhost:5173`](http://localhost:5173)

---

### 3. Start the Admin Portal

```bash
cd admin
npm run dev
```

Admin URL: [`http://localhost:5174`](http://localhost:5174)

---

## 🔌 How Frontend Connects to Backend

`frontend/src/services/api.js` creates an Axios instance:
```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});
```

Environment variable in `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🔌 How Admin Connects to Backend

`admin/src/services/api.js` creates its own Axios instance (with admin token key):
```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});
```

Environment variable in `admin/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Both apps point to the **same single backend**. No separate backend exists.

---

## 🔒 Backend CORS Configuration

The backend (`backend/app.js`) is configured to accept requests from both:
- `http://localhost:5173` (Customer Frontend)
- `http://localhost:5174` (Admin Portal)

Environment variables in `backend/.env`:
```env
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

---

## 📦 Development Phase Roadmap

- [x] **Phase 1**: Three-application project setup and architecture
- [ ] **Phase 2**: MongoDB + Mongoose Schemas (User, Product, Category, Order, Review, Wishlist)
- [ ] **Phase 3**: JWT Authentication + Role-Based Authorization (customer / admin)
- [ ] **Phase 4**: Product & Category REST APIs
- [ ] **Phase 5**: Customer Product Browsing, Filtering & Search
- [ ] **Phase 6**: Product Details Page + Cart Management
- [ ] **Phase 7**: Secure Checkout + Server-Validated Order Creation
- [ ] **Phase 8**: Customer Account + Order History
- [ ] **Phase 9**: Admin Dashboard + Live MongoDB Metrics
- [ ] **Phase 10**: Admin Product & Category CRUD Studio
- [ ] **Phase 11**: Admin Order Processing & Status Pipeline
- [ ] **Phase 12**: Printable Parcel Shipping Labels & Invoices
- [ ] **Phase 13**: Customer Reviews & Wishlist
- [ ] **Phase 14**: Security Hardening, Validation & Production Readiness
