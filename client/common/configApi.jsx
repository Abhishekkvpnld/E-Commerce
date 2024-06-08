
const backendDomain = "http://localhost:8000/api";


const endPoints = {

    singUp: {
        url: `${backendDomain}/auth/signup`,
        method: "POST"
    },
    logIn: {
        url: `${backendDomain}/auth/login`,
        method: "POST"
    }

};

export default endPoints;