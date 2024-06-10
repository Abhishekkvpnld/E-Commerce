import express from "express";
import { authToken } from "../middleware/authToken.js";
import { userDetails } from "../controllers/userDetails.js";
import { userLogout } from "../controllers/userLogout.js";


const router = express.Router();

router.get("/user-details",authToken,userDetails);
router.get("/user-logout",userLogout);

export default router;