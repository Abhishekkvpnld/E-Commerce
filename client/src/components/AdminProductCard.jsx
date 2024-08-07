import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';


const AdminProductCard = ({ data, fetchAllProducts }) => {

  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className='bg-white p-3 rounded-lg border-2 min-h-[250px] max-h-[250px]'>
      <div className='w-40'>

        <div className='w-32 h-32 flex justify-center items-center '>
          <img src={data?.productImage[0]} alt="image" width={100} height={100} className='rounded mx-auto object-fill max-h-[130px]' />
        </div>

        <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>

        <div className='flex flex-col justify-end'>

          <p className='font-semibold'>
            {
              displayINRCurrency(data?.sellingPrice)
            }
          </p>


          <div title='Edit' onClick={() => setEditProduct(true)} className='w-fit ml-auto p-2 bg-blue-100 border font-bold rounded-full cursor-pointer hover:bg-black hover:text-white'>
            <CiEdit title='Edit' />
          </div>

        </div>

      </div>

      {
        editProduct && (
          <AdminEditProduct onClose={() => setEditProduct(false)} productData={data} fetchAllProducts={fetchAllProducts} />
        )
      }

    </div>
  )
}

export default AdminProductCard;