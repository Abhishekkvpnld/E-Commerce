import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/auth",auth); 
app.use(express.json());


app.get("/api", (req, res) => {
    res.send("server running...");
});

const PORT = 8000 || process.env.PORT;

//MongoDb connection
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}..🚀`);
    });
});

