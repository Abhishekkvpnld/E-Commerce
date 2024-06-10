
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
    all_users:{
        url:`${backendDomain}/all-users`,
        method:"GET"
    }

};

export default endPoints;