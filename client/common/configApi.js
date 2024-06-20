
const backendDomain = "http://localhost:8000/api";


const endPoints = {

    singUp: {
        url: `${backendDomain}/auth/signup`,
        method: "POST"
    },
    logIn: {
        url: `${backendDomain}/auth/login`,
        method: "POST"
    },
    current_user: {
        url: `${backendDomain}/user-details`,
        method: "GET"
    },
    user_logout: {
        url: `${backendDomain}/user-logout`,
        method: "GET"
    },
    all_users: {
        url: `${backendDomain}/all-users`,
        method: "GET"
    },
    update_User_role: {
        url: `${backendDomain}/update-user-role`,
        method: "POST"
    },
    uploadProduct: {
        url: `${backendDomain}/upload-product`,
        method: "POST"
    },
    allProducts: {
        url: `${backendDomain}/get-all-products`,
        method: "Get"
    },
    updateProduct: {
        url: `${backendDomain}/update-product`,
        method: "POST"
    },
    getProductCategory: {
        url: `${backendDomain}/get-category-product`,
        method: "GET"
    },
    getCategoryWiseProducts: {
        url: `${backendDomain}/get-categoryWise-product`,
        method: "POST"
    },
    getProductDetails: {
        url: `${backendDomain}/get-product-details`,
        method: "POST",
    },
    addToCartProduct: {
        url: `${backendDomain}/addToCart`,
        method: "POST"
    },
    countAddToCartProduct: {
        url: `${backendDomain}/count-addtocart-product`,
        method: "GET"
    },
    cartViewProduct: {
        url: `${backendDomain}/view-cart-product`,
        method: "GET"
    },
    updateCartProduct: {
        url: `${backendDomain}/update-cart-product`,
        method: "POST"
    },
    deleteCartProduct:{
        url:`${backendDomain}/delete-cart-product`,
        method:"POST"
    }
};

export default endPoints;