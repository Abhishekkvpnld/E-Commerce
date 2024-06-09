import express from "express";
import { authToken } from "../middleware/authToken.js";
import { userDetails } from "../controllers/userDetails.js";


const router = express.Router();

router.get("/user-details",authToken,userDetails);

export default router;