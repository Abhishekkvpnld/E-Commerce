import "dotenv/config"; // ✅ Must be first — loads .env before anything else
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import auth from "./routes/auth.js";
import cookie from "cookie-parser";
import userRoute from "./routes/userRoute.js";
// import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// ── Security & Performance Middleware ─────────────────────────────────────────
app.use(helmet()); // Sets 15 security headers automatically
app.use(compression()); // Gzip all responses — reduces bandwidth ~70%

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);

// ── Body Parsing & Logging ────────────────────────────────────────────────────
app.use(morgan("dev")); // Logs all requests to console
app.use(express.json());
app.use(cookie());

// ── Rate Limiting ─────────────────────────────────────────────────────────────
// const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// app.use("/api", limiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", auth);
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("server running...");
});

// ── Global Error Handler (must be LAST app.use) ───────────────────────────────
app.use(errorHandler); // ✅ No () — pass the function reference, not its return value

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}..🚀`);
  });
});
