import React, { useEffect, useState } from 'react';
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

  console.log("orderData", fetchData);

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className='mx-auto py-4 container'>
      {
        !fetchData[0] && (
          <p>NO Order Available</p>
        )
      }

      <div>
        {
          fetchData?.map((item, index) => (
            <div key={item?.userId + index}>
              <p className='text-lg font-semibold'>{moment(item?.createdAt).format("LL")}</p>

              <div>
                {
                  item?.productDetails?.map((product, index) => {
                    return (
                      <div key={product?.productId + index} className='flex gap-3 items-center justify-between border-2 p-1 pr-2'>
                        <img src={product?.image[0]} alt="image" className='h-28 w-28 object-scale-down p-2 bg-slate-200' />

                        <div>
                          <p className='font-semibold text-lg text-ellipsis line-clamp-1 p-1'>{product?.name}</p>

                          <div className='flex items-center gap-4 mt-1'>
                            <p>{displayINRCurrency(product?.price)}</p>
                            <p>{product?.quantity}</p>
                          </div>
                        </div>

                        <div>
                          <div className='font-semibold text-lg text-ellipsis line-clamp-1'>Payment Details</div>
                          <p>Payment Method : {item?.paymentDetails?.payment_method_type[0]}</p>
                          <p>Payment Status : {item?.paymentDetails?.payment_status}</p>
                        </div>

                        <div>
                          <div className='font-semibold text-lg text-ellipsis line-clamp-1'>shipping Details</div>
                          {
                            item?.shipping_options.map((shipping, index) => {
                              return (
                                <div key={index}>
                                  Shipping Amount : {displayINRCurrency(shipping?.shipping_amount)}
                                </div>
                              )
                            })
                          }
                        </div>

                        <div >
                          <p className='font-semibold text-lg text-ellipsis line-clamp-1'>Total Amount : </p>
                          <p className='text-lg font-normal text-red-700'>{displayINRCurrency(item?.total_amount)}/-</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default OrderPage;