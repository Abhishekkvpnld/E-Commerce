import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("server running...")
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});