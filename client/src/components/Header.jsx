import React, { useContext, useState } from 'react';
import { CiSearch, CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import Logo from './Logo';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";
import { setUserDetails } from "../redux/userSlice";
import { ROLE } from "../../common/role";
import userContext from '../context/userContext';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(userContext);


  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);


  const handleLogout = async () => {
    try {
      const response = await axios.get(endPoints.user_logout.url, { withCredentials: true });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUserDetails(null));
        navigate("/")
      };

    } catch (error) {
      toast.error(error?.response?.data?.message)
    };

  };

  return (
    <header className='h-16 shadow-md fixed  bg-white w-full z-50 '>
      <div className="h-full container mx-auto flex items-center px-3 justify-between">

        <Link to={"/"}>
          <div className=''>
            <Logo w={80} h={50} />
          </div>
        </Link>

        <div className='hidden lg:flex items-center rounded-full '>
          <input type="text" placeholder='searc products here...' className='w-full outline-none px-4 bg-slate-100 py-2 rounded-full ' />
          <div className='px-2 text-lg min-w-[50px] h-8 bg-blue-600 hover:bg-blue-700 flex items-center justify-center rounded-full text-white '>
            <CiSearch className='hover:scale-110 transition-all' />
          </div>
        </div>

        <div className='flex items-center gap-7'>


          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl rounded-full cursor-pointer hover:bg-gray-200 relative m-5 p-2'>
                <span> <IoCartOutline  className='hover:scale-110 transition-all' /></span>
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex justify-center items-center absolute -top-2 -right-3 '>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>

              </Link>
            )
          }


          <div className='relative group flex justify-center' onClick={() => setMenuDisplay((prev) => !prev)}>

            {
              user?._id && (
                <div className='text-2xl rounded-full border cursor-pointer hover:bg-slate-500 p-1 flex relative justify-center'>
                  {
                    user?.profilePicture ? (<img src={user?.profilePicture} className="w-10 h-10 rounded-full" alt={user?.username} />
                    ) : (<CiUser />)
                  }
                </div>
              )

            }


            {
              user?.role === ROLE.ADMIN && menuDisplay && (
                <div className='absolute bottom-0 mt-3 top-11 h-fit px-2 shadow-lg rounded bg-slate-50  hover:bg-slate-200 hidden md:block'>
                  <nav>
                    <Link to={"/admin-panel"} className='whitespace-nowrap p-2 hidden md:block'>Admin-Panel</Link>
                  </nav>
                </div>
              )
            }

          </div>


          {
            user?._id ? (
              <div>
                <button onClick={handleLogout} className='px-3 py-1 rounded-lg border-2 hover:bg-red-600 hover:text-white'>
                  logout
                </button>
              </div>
            ) : (
              <Link to={"/login"}>
                <div>
                  <button className='px-4 py-1 rounded-lg border-2 hover:bg-green-600 hover:text-white'>
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