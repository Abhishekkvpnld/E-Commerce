
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
    }

};

export default endPoints;