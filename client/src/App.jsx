import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import endPoints from '../common/configApi';
import { useEffect } from 'react';
import userContext from './context/userContext';

function App() {

  const fetchUserDetails = async () => {
    try {
      const current_user = await axios.get(endPoints.current_user.url, { withCredentials: true });
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);


  return (
    <>
      <userContext.Provider value={{ fetchUserDetails }}>     {/*User details*/ }
        <Header />

        <main className='min-h-[calc(100vh-100px)] flex items-center justify-center'>
          <Outlet />
        </main>

        <Footer />
        <Toaster />
      </userContext.Provider>
    </>
  )
}

export default App;
