import express from "express";
import { authToken } from "../middleware/authToken.js";
import { userDetails } from "../controllers/userDetails.js";
import { userLogout } from "../controllers/userLogout.js";
import { allUsers } from "../controllers/allUsers.js";
import { updateUserRole } from "../controllers/updateUserRole.js";
import { uploadproduct } from "../controllers/uploadProduct.js";


const router = express.Router();   

router.get("/user-details",authToken,userDetails);
router.get("/user-logout",userLogout);


//Admin routes
router.get("/all-users",authToken,allUsers);
router.post("/update-user-role",authToken,updateUserRole);
router.post("/upload-product",authToken,uploadproduct);

export default router;