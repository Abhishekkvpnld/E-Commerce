<div align="center">

# 🛒 E-Commerce App

A full-stack e-commerce application built with **React**, **Node.js**, **MongoDB**, and **Stripe** — featuring an AI-powered shopping assistant, admin dashboard, Redis caching, and Docker support.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Docker Setup](#-docker-setup)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🛍️ Customer Features
- **Product Browsing** — Browse by categories, view product details with image galleries
- **Smart Search** — Full-text product search with instant results
- **Shopping Cart** — Add/remove items, update quantities, real-time cart count
- **Stripe Checkout** — Secure payment processing with Stripe integration
- **Order Management** — View order history with success/cancel payment flows
- **AI Chatbot** — Intelligent shopping assistant powered by Google Gemini & Groq
- **User Authentication** — JWT-based signup/login with secure cookie sessions
- **Password Recovery** — OTP-based forgot password flow via email (Nodemailer)

### 🔧 Admin Features
- **Admin Dashboard** — Dedicated admin panel with role-based access
- **Product Management** — Upload, edit, and manage product catalog
- **User Management** — View all users, update roles (admin/user)
- **Order Tracking** — View and manage all customer orders
- **Image Uploads** — Product image hosting via Cloudinary

### ⚡ Performance & Security
- **Redis Caching** — Response caching with Upstash Redis for blazing-fast API responses
- **Rate Limiting** — API rate limiting (configurable) to prevent abuse
- **Helmet.js** — 15+ security headers set automatically
- **Gzip Compression** — ~70% bandwidth reduction on all responses
- **RTK Query** — Client-side caching, deduplication, and automatic refetching
- **React Query** — Server state management with TanStack Query

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library with hooks |
| **Vite 5** | Lightning-fast build tool & dev server |
| **Redux Toolkit** | Global state management |
| **RTK Query** | Data fetching & caching layer |
| **TanStack React Query** | Server state management |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Utility-first CSS framework |
| **Framer Motion** | Animations & transitions |
| **Axios** | HTTP client |
| **Stripe.js** | Client-side payment integration |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB + Mongoose** | Database & ODM |
| **Redis (Upstash)** | Caching layer |
| **Stripe** | Payment processing & webhooks |
| **JWT** | Token-based authentication |
| **bcrypt** | Password hashing |
| **Google Gemini AI** | AI chatbot (embeddings & chat) |
| **Groq SDK** | Alternative LLM provider |
| **Nodemailer** | Email (OTP for password reset) |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logger |
| **Compression** | Gzip response compression |

### DevOps
| Technology | Purpose |
|---|---|
| **Docker & Docker Compose** | Containerized development |
| **Vercel** | Frontend & backend deployment |

---

## 📁 Project Structure

```
E-Commerce_App/
├── docker-compose.yml          # Multi-container orchestration
│
├── client/                     # React frontend (Vite)
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json             # Vercel deployment config
│   ├── public/
│   └── src/
│       ├── api/                # API utility functions
│       ├── assest/             # Static assets
│       ├── common/             # Shared constants & utilities
│       ├── components/         # Reusable UI components
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── ChatBot.jsx
│       │   ├── BannerProduct.jsx
│       │   ├── CategoryList.jsx
│       │   ├── UploadProduct.jsx
│       │   ├── AdminEditProduct.jsx
│       │   └── ...
│       ├── context/            # React context providers
│       ├── helpers/            # Helper functions
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Library configs (React Query)
│       ├── pages/              # Route pages
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── SignUp.jsx
│       │   ├── Cart.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── AdminPanel.jsx
│       │   ├── OrderPage.jsx
│       │   └── ...
│       ├── redux/              # Redux store, slices, RTK Query
│       └── routes/             # Route configuration
│
├── server/                     # Express backend
│   ├── Dockerfile
│   ├── package.json
│   ├── app.js                  # Server entry point
│   ├── vercel.json             # Vercel deployment config
│   ├── config/
│   │   ├── database.js         # MongoDB connection
│   │   ├── redis.js            # Redis client setup
│   │   └── stripe.js           # Stripe configuration
│   ├── controllers/
│   │   ├── chat/               # AI chatbot controller
│   │   ├── order/              # Payment, webhooks, orders
│   │   ├── product/            # CRUD, search, filter, categories
│   │   └── user/               # Auth, profile, cart, password
│   ├── helper/
│   │   ├── embeddings.js       # AI embeddings for product search
│   │   ├── nodeMailer.js       # Email service
│   │   ├── otpGenerator.js     # OTP generation
│   │   └── permission.js       # Role-based permission checks
│   ├── middleware/
│   │   ├── authToken.js        # JWT auth middleware
│   │   ├── cache.js            # Redis cache middleware
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── cartModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── auth.js             # Signup & login routes
│   │   ├── userRoute.js        # All protected routes
│   │   └── chatRoute.js        # AI chat endpoint
│   └── scripts/
│       ├── embedProducts.js    # Generate product embeddings
│       └── removeEmbedProducts.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 9.x
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas))
- **Redis** (local or [Upstash](https://upstash.com/))
- **Stripe Account** ([dashboard.stripe.com](https://dashboard.stripe.com))
- **Cloudinary Account** ([cloudinary.com](https://cloudinary.com))
- **Docker** (optional — for containerized setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishekkvpnld/E-Commerce.git
   cd E-Commerce
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables** (see [below](#environment-variables))

5. **Run the development servers**

   *Terminal 1 — Backend:*
   ```bash
   cd server
   npm run dev
   ```

   *Terminal 2 — Frontend:*
   ```bash
   cd client
   npm run dev
   ```

6. **Open the app**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8000](http://localhost:8000)

### Environment Variables

Create `.env` files in both `client/` and `server/` directories.

<details>
<summary><strong>📄 client/.env</strong></summary>

```env
VITE_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
VITE_APP_CLOUD_URL=https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
VITE_APP_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
VITE_APP_BACKEND_URL=http://localhost:8000/api
```

</details>

<details>
<summary><strong>📄 server/.env</strong></summary>

```env
PORT=8000

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/E-commerce_app
MONGODB_URI_LOCAL=mongodb://127.0.0.1:27017/E-commerce_app

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_END_POINT_WEBHOOK_SECRET_KEY=your_stripe_webhook_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Email (Nodemailer)
USER_EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Redis
REDIS_URL_CLOUD=rediss://default:xxxxx@your-redis-url:6379
```

</details>

> ⚠️ **Never commit `.env` files to version control.** Make sure `.env` is listed in your `.gitignore`.

---

## 🐳 Docker Setup

Spin up the entire stack (frontend, backend, MongoDB) with a single command:

```bash
docker-compose up --build
```

| Service | Container | Port |
|---|---|---|
| Frontend | `ecom-frontend` | [localhost:5173](http://localhost:5173) |
| Backend | `ecom-backend` | [localhost:8000](http://localhost:8000) |
| MongoDB | `ecom-mongodb` | `localhost:27017` |

To stop all containers:
```bash
docker-compose down
```

To stop and remove all data volumes:
```bash
docker-compose down -v
```

---

## 📡 API Reference

Base URL: `http://localhost:8000/api`

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/signup` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login & receive JWT cookie | ❌ |

### User
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/user-details` | Get current user profile | ✅ |
| `GET` | `/user-logout` | Logout & clear cookie | ❌ |
| `POST` | `/forgot-password` | Send OTP to email | ❌ |
| `POST` | `/change-password` | Reset password with OTP | ❌ |

### Products
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/get-all-products` | List all products (cached) | ❌ |
| `GET` | `/get-category-product` | Get one product per category (cached) | ❌ |
| `POST` | `/get-categoryWise-product` | Get products by category (cached) | ❌ |
| `POST` | `/get-product-details` | Get single product details | ❌ |
| `POST` | `/search-products` | Search products | ❌ |
| `POST` | `/filter-products` | Filter products | ❌ |
| `POST` | `/upload-product` | Upload new product | ✅ Admin |
| `POST` | `/update-product` | Update product details | ✅ Admin |

### Cart
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/addToCart` | Add product to cart | ✅ |
| `GET` | `/count-addtocart-product` | Get cart item count | ✅ |
| `GET` | `/view-cart-product` | View cart contents | ✅ |
| `POST` | `/update-cart-product` | Update cart item quantity | ✅ |
| `POST` | `/delete-cart-product` | Remove item from cart | ✅ |

### Orders & Payments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/checkout` | Create Stripe checkout session | ✅ |
| `POST` | `/webhook` | Stripe webhook handler | ❌ |
| `GET` | `/order-list` | Get user's orders | ✅ |
| `GET` | `/all-orders` | Get all orders (admin) | ✅ Admin |

### Admin
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/all-users` | List all users | ✅ Admin |
| `POST` | `/update-user-role` | Change user role | ✅ Admin |

### AI Chat
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/chat` | Chat with AI shopping assistant | ❌ |

---

## 🚢 Deployment

The app is configured for deployment on **Vercel** (both frontend and backend).

### Frontend (Vercel)
```bash
cd client
vercel --prod
```

### Backend (Vercel)
```bash
cd server
vercel --prod
```

> Both directories include `vercel.json` configuration files for seamless deployment.

### Other Platforms
- **Frontend**: Can be deployed to Netlify, AWS Amplify, or any static hosting
- **Backend**: Can be deployed to Render, Railway, AWS EC2, or any Node.js hosting
- **Database**: MongoDB Atlas (cloud) is recommended for production
- **Redis**: Upstash Redis is recommended for serverless-compatible caching

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project useful, please consider giving it a star! ⭐**

Made with ❤️ by [Abhishek](https://github.com/Abhishekkvpnld)

</div>
