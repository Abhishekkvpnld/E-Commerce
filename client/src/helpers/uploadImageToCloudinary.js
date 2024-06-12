import axios from "axios";


const url = `https://api.cloudinary.com/v1_1/dwfi3oxyl/image/upload`

const uploadImageToCloudinary = async (image) => {
    console.log(image)
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "E-commerce-product");

    const response = await axios.post(url, formData);

    return response.data;
};

export default uploadImageToCloudinary;