import React, { useState } from 'react';
import { CiSearch, CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import Logo from './Logo';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";
import { setUserDetails } from "../redux/userSlice";


const Header = () => {

  const dispatch = useDispatch();

  const [menuDisplay, setMenuDisplay] = useState(false);

  const user = useSelector((state) => state?.user?.user);
  console.log("user", user)


  const handleLogout = async () => {
    try {
      const response = await axios.get(endPoints.user_logout.url, { withCredentials: true });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUserDetails(null))
      };

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    };

  };

  return (
    <header className='h-16 shadow-md'>
      <div className="h-full container mx-auto flex items-center px-3 justify-between">

        <Link to={"/"}>
          <div className=''>
            <Logo w={80} h={50} />
          </div>
        </Link>

        <div className='hidden lg:flex items-center rounded-full '>
          <input type="text" placeholder='searc products here...' className='w-full outline-none px-2 ' />
          <div className='px-2 text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-full text-white '>
            <CiSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='text-2xl rounded-lg cursor-pointer hover:bg-gray-200 relative m-5 p-1'>
            <span> <IoCartOutline /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex justify-center items-center absolute -top-2 -right-3 '>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div className='relative group flex justify-center' onClick={()=>setMenuDisplay((prev)=>!prev)}>
            <div className='text-2xl rounded-lg border cursor-pointer hover:bg-green-50 p-1 flex relative justify-center'>
              {
                user?.profilePicture ? (<img src={user?.profilePicture} className="w-10 h-10 rounded-full" alt={user?.username} />
                ) : (<CiUser />)
              }
            </div>

            {
              menuDisplay && (
                <div className='absolute bottom-0 top-11 h-fit p-2 shadow-lg rounded bg-slate-50  hover:bg-slate-200 '>
                  <nav>
                    <Link to={"/admin-panel"} className='whitespace-nowrap p-2'>Admin-Panel</Link>
                  </nav>
                </div>
              )
            }

          </div>



          {
            user?._id ? (
              <div>
                <button onClick={handleLogout} className='px-3 py-1 rounded text-white bg-red-500 hover:bg-green-600'>
                  logout
                </button>
              </div>
            ) : (
              <Link to={"/login"}>
                <div>
                  <button className='px-3 py-1 rounded-full text-white bg-green-500 hover:bg-green-600'>
                    Login
                  </button>
                </div>
              </Link>
            )
          }



        </div>


      </div>

    </header>
  )
}

export default Header;