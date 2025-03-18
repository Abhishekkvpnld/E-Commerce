import { useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import moment from "moment";
import displayINRCurrency from '../helpers/displayCurrency';


const OrderPage = () => {

  const [fetchData, setFetchData] = useState([]);

  const fetchOrderData = async () => {
    const orderData = await axios.get(endPoints.orderList.url, { withCredentials: true });
    const responseData = orderData?.data;

    setFetchData(responseData?.data);
  };


  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className='p-4 min-h-[calc(100vh-100px)]'>
      {
        !fetchData[0] && (
          <div className='flex justify-center items-center w-full font-semibold'>
            <p className='p-32'>NO Order Available</p>
          </div>
        )
      }

      <div className='p-2 rounded-lg'>
        {
          fetchData?.map((item, index) => (

            <div key={item?.userId + index} className='border-2 mt-4 p-3 rounded-lg'>
              <p className='text-lg font-semibold'>{moment(item?.createdAt).format("LL")}</p>

              <div className='flex flex-col md:flex-row justify-between'>

                <div className='grid gap-1'>
                  {
                    item?.productDetails?.map((product, index) => {
                      return (
                        <div key={product?.productId + index} className='flex gap-3 p-1 pr-2 max-w-[700px]'>
                          <img src={product?.image[0]} alt="image" className='h-28 w-28 object-scale-down p-2 bg-slate-200' />

                          <div>
                            <div className='font-semibold text-lg text-ellipsis line-clamp-1 p-1'>{product?.name}</div>

                            <div className='flex flex-col mt-1'>
                              <div className='text-lg font-semibold'>price: <span className='text-blue-800'>{displayINRCurrency(product?.price)}</span></div>
                              <div className='font-semibold'>Quantity : <span className='text-violet-800'>{product?.quantity}</span></div>
                            </div>
                          </div>

                        </div>
                      )
                    })
                  }
                </div>

                <div className='flex flex-row justify-between md:justify-normal md:flex-col m-3 p-4 gap-3'>

                  <div className=''>
                    <div className='font-semibold text-lg text-ellipsis line-clamp-1'>Payment Details :</div>
                    <p className='ml-1'>Payment Method : <span className='font-bold text-blue-800'> {item?.paymentDetails?.payment_method_type[0]}💳</span></p>
                    <p className='ml-1'>Payment Status : <span className='font-bold text-blue-800'>{item?.paymentDetails?.payment_status}✅</span></p>
                  </div>

                  <div>
                    <div className='font-semibold text-lg text-ellipsis line-clamp-1'>shipping Details :</div>
                    {
                      item?.shipping_options.map((shipping, index) => {
                        return (
                          <div key={index}>
                            Shipping Amount : <span className='font-bold text-green-800'>{displayINRCurrency(shipping?.shipping_amount)}</span>
                          </div>
                        )
                      })
                    }
                  </div>

                </div>

              </div>

              <div className='font-semibold flex justify-between md:justify-end'>
                <p className='border rounded-md p-2 bg-slate-100'>Total Amount :<span className='text-red-700'>{displayINRCurrency(item?.total_amount)}/-</span></p>
              </div>

            </div>
          ))
        }
      </div>

    </div>
  );
};

export default OrderPage;