import axios from "axios";
import endPoints from "../../common/configApi";


export const getCategoryWiseProduct = async (category) => { 
    const response = await axios.post(endPoints.getCategoryWiseProducts.url,{category});
    return response?.data;
};