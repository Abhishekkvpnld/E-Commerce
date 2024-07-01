

const backendDomain = "https://e-commerce-spb9.onrender.com/api" || "https://e-commerce-app-gamma-nine.vercel.app/api" || "http://localhost:8000/api";

const endPoints = {

    singUp: {
        url: `${backendDomain}/auth/signup`,
        method: "POST"
    },
    logIn: {
        url: `${backendDomain}/auth/login`,
        method: "POST"
    },
    ForgotPassword: {
        url: `${backendDomain}/forgot-password`,
        method: "POST"
    },
    changePassword: {
        url: `${backendDomain}/change-password`,
        method:"POST"
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
    deleteCartProduct: {
        url: `${backendDomain}/delete-cart-product`,
        method: "POST"
    },
    searchProducts: {
        url: `${backendDomain}/search-products`,
        method: "POST"
    },
    filterProducts: {
        url: `${backendDomain}/filter-products`,
        method: "POST"
    },
    payment: {
        url: `${backendDomain}/checkout`,
        method: "POST"
    },
    orderList: {
        url: `${backendDomain}/order-list`,
        method: "GET"
    },
    allOrders: {
        url: `${backendDomain}/all-orders`,
        methos: "GET"
    }

};

export default endPoints;