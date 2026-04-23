import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import userContext from './context/userContext';
import { useDispatch } from "react-redux";
import { setUserDetails } from './redux/userSlice';
import { useGetCartCountQuery, useGetCurrentUserQuery } from './redux/api/apiSlice';

function App() {

  const dispatch = useDispatch();

  // RTK Query naturally fetches and caches this data automatically!
  const { data: currentUserData, refetch: fetchUserDetails } = useGetCurrentUserQuery();
  const { data: cartCountData, refetch: fetchAddToCart } = useGetCartCountQuery();

  // Keep Redux user slice synced for backward compatibility with other components
  useEffect(() => {
    if (currentUserData?.success) {
      dispatch(setUserDetails(currentUserData.data));
    } else if (currentUserData && !currentUserData.success) {
      // Handle logged out state
      dispatch(setUserDetails(null));
    }
  }, [currentUserData, dispatch]);

  const cartProductCount = cartCountData || 0;


  return (
    <div className='flex flex-col justify-between'>
      <userContext.Provider value={{
        fetchUserDetails, /*User details*/
        cartProductCount,  // user add to cart product count
        fetchAddToCart
      }}>
        <Header />

        <main className='min-h-[calc(100vh-100px)] pt-28 md:pt-16'>
          <Outlet />
        </main>

        <Footer />
        <Toaster />
      </userContext.Provider>
    </div>
  )
}

export default App;
