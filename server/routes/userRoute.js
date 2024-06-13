import express from "express";
import { authToken } from "../middleware/authToken.js";
import { userDetails } from "../controllers/userDetails.js";
import { userLogout } from "../controllers/userLogout.js";
import { allUsers } from "../controllers/allUsers.js";
import { updateUserRole } from "../controllers/updateUserRole.js";
import { uploadproduct } from "../controllers/uploadProduct.js";
import { getAllProducts } from "../controllers/getAllProducts.js";
import { updateProduct } from "../controllers/updateProduct.js";


const router = express.Router();   

router.get("/user-details",authToken,userDetails);
router.get("/user-logout",userLogout);


//Admin routes
router.get("/all-users",authToken,allUsers);
router.post("/update-user-role",authToken,updateUserRole);
router.post("/upload-product",authToken,uploadproduct);
router.get("/get-all-products",getAllProducts);
router.post("/update-product",authToken,updateProduct);
export default router;