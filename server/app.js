import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import auth from "./routes/auth.js";
import cookie from "cookie-parser";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://e-commerce-abhisheks-projects-70ee5198.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookie());

//Routes middlewares
app.use("/api/auth", auth);
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("server running...");
});

const PORT = process.env.PORT || 8000;

//MongoDb connection
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}..🚀`);
  });
});
