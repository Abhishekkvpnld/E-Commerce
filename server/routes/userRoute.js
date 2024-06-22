import express from "express";
import { authToken } from "../middleware/authToken.js";
import { userDetails } from "../controllers/user/userDetails.js";
import { userLogout } from "../controllers/user/userLogout.js";
import { allUsers } from "../controllers/user/allUsers.js";
import { updateUserRole } from "../controllers/user/updateUserRole.js";
import { uploadproduct } from "../controllers/product/uploadProduct.js";
import { getAllProducts } from "../controllers/product/getAllProducts.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { getCategoryProduct } from "../controllers/product/getCategorySingleProduct.js";
import { getCategoryWiseProduct } from "../controllers/product/getCategoryWiseProduct.js";
import { getProductDetails } from "../controllers/product/getProductDetails.js";
import { addToCart } from "../controllers/user/addToCart.js";
import { countAddToCartProduct } from "../controllers/user/countAddToCartProduct.js";
import { addToCartViewProducts } from "../controllers/user/addToCartViewProduct.js";
import { changeCountAddToCartproduct } from "../controllers/user/changeCountAddToCartproduct.js";
import { deleteCartProduct } from "../controllers/user/deleteCartProduct.js";
import { searchProducts } from "../controllers/product/searchProducts.js";
import { filterProduct } from "../controllers/product/filterProduct.js";


const router = express.Router();     

//User Data
router.get("/user-details",authToken,userDetails);
router.get("/user-logout",userLogout);

//Product Details
router.post("/get-product-details",getProductDetails);
router.post("/search-products",searchProducts);
router.post("/filter-products",filterProduct);

//Admin routes
router.get("/all-users",authToken,allUsers);
router.post("/update-user-role",authToken,updateUserRole);
router.post("/upload-product",authToken,uploadproduct);
router.get("/get-all-products",getAllProducts);
router.post("/update-product",authToken,updateProduct);
router.get("/get-category-product",getCategoryProduct);
router.post("/get-categoryWise-product",getCategoryWiseProduct);


//Add to Cart
router.post("/addToCart",authToken,addToCart);
router.get("/count-addtocart-product",authToken,countAddToCartProduct);
router.get("/view-cart-product",authToken,addToCartViewProducts);
router.post("/update-cart-product",authToken,changeCountAddToCartproduct);
router.post("/delete-cart-product",authToken,deleteCartProduct);

export default router;