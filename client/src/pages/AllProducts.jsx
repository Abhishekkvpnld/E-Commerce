import React, { useState } from 'react';
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div>
      <div className='bg-white py-2 px-3 flex justify-between items-center'>
        <h2 className='font-bold text-lg hover:cursor-pointer' onClick={() => setOpenUploadProduct(false)}>All Products</h2>
        <button onClick={() => setOpenUploadProduct(true)} className='border-2  bg-slate-100 px-3 py-1 rounded-lg text-green-700 hover:border-green-600 hover:border-3 hover:bg-green-700 hover:text-white transition-all'>Upload Product</button>
      </div>

      {/*Upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} />
        )
      }

    </div>
  )
};

export default AllProducts;