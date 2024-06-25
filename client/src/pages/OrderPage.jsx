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
    <div className='mx-auto p-4'>
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
                      <div key={product?.productId + index}>
                        <img src={product?.image[0]} alt="image" className='h-28 w-28 object-scale-down p-2 bg-slate-200' />
                        <p>{product?.name}</p>

                        <div className='flex items-center justify-between gap-4'>
                          <p>{displayINRCurrency(product?.price)}</p>
                          <p>{product?.quantity}</p>
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