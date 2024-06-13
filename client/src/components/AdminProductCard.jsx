import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from './AdminEditProduct';


const AdminProductCard = ({ data }) => {

  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-4 rounded'>
      <img src={data?.productImage[0]} alt="image" width={120} height={120} className='rounded' />
      <h1>{data?.productName}</h1>

      <div onClick={()=>setEditProduct(true)} className='w-fit ml-auto p-2 bg-purple-300 font-bold rounded-full cursor-pointer hover:bg-green-700 hover:text-white'>
        <CiEdit />
      </div>

      {
        editProduct && (
          <AdminEditProduct onClose={() => setEditProduct(false)} productData={data} />
        )
      }

    </div>
  )
}

export default AdminProductCard;