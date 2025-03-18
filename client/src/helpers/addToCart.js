import axios from "axios";
import endPoints from "../../common/configApi";
import toast from "react-hot-toast";

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log(id)

    try {
        const response = await axios.post(endPoints.addToCartProduct.url, { productId: id }, { withCredentials: true });
        const savedData = response?.data;

        if (savedData?.success) {
            toast.success(savedData?.message)
        }

        if (savedData?.error) {
            toast.error(savedData?.message);
        }

        return savedData;


    } catch (error) {
        toast.error(error?.response?.data?.message);
    }

};

export default addToCart;