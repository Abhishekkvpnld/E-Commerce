import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import endPoints from '../common/configApi';
import { useEffect, useState } from 'react';
import userContext from './context/userContext';
import { useDispatch } from "react-redux";
import { setUserDetails } from './redux/userSlice';

function App() {

  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);


  const fetchUserDetails = async () => {
    try {
      const current_user = await axios.get(endPoints.current_user.url, { withCredentials: true });

      if (current_user?.data?.success) {
        dispatch(setUserDetails(current_user?.data?.data));
      };

    } catch (error) {
      console.log(error);
    };
  };


  const fetchAddToCart = async () => {
    try {
      const response = await axios.get(endPoints.countAddToCartProduct.url, { withCredentials: true });
      const responseData = response?.data;

      setCartProductCount(responseData?.data?.count);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //user Details
    fetchUserDetails();
    //User AddToCart
    fetchAddToCart();
  }, [fetchUserDetails]);


  return (
    <>
      <userContext.Provider value={{
        fetchUserDetails, /*User details*/
        cartProductCount,  // user add to cart product count
        fetchAddToCart
      }}>
        <Header />

        <main className='min-h-[calc(100vh-100px)] pt-16'>
          <Outlet />
        </main>

        <Footer />
        <Toaster />
      </userContext.Provider>
    </>
  )
}

export default App;
