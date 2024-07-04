import { useEffect, useState } from 'react';
import UploadProduct from "../components/UploadProduct";
import axios from 'axios';
import toast from 'react-hot-toast';
import endPoints from '../../common/configApi';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
 

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(endPoints.allProducts.url, { withCredentials: true });
      const data = response?.data?.data;

      setAllProducts(data);

    } catch (error) {
      toast.error(error?.message)
    }
  };


  useEffect(() => {
    fetchAllProducts();
  }, []);


  return (
    <div>
      <div className='bg-white py-2 px-3 flex justify-between items-center'>
        <h2 className='font-bold text-lg hover:cursor-pointer' onClick={() => setOpenUploadProduct(false)}>All Products</h2>
        <button onClick={() => setOpenUploadProduct(true)} className='border-2  bg-slate-700 px-3 py-1 rounded-lg text-white hover:border-green-600 hover:border-3 hover:bg-green-700 transition-all'>Upload Product</button>
      </div>



      {/**GET ALL PRODUCTS */}
      <div className='flex items-center p-1 gap-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProducts?.map((product, index) => (
            <AdminProductCard data={product} key={index} fetchAllProducts={fetchAllProducts} />
          ))
        }
      </div>



      {/*Upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProducts} />
        )
      }

    </div>
  )
};

export default AllProducts;