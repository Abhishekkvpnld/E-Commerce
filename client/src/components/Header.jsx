import React from 'react';
import { CiSearch, CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import Logo from './Logo';

const Header = () => {
  return (
    <header className='h-16 shadow-md'>
      <div className="h-full container mx-auto flex items-center px-3 justify-between">

        <div className=''>
          <Logo w={80} h={50} />
        </div>

        <div className='hidden lg:flex items-center rounded-full '>
          <input type="text" placeholder='searc products here...' className='w-full outline-none px-2 ' />
          <div className='px-2 text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-full text-white '>
            <CiSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='text-3xl rounded-lg cursor-pointer hover:bg-gray-200 relative m-5 p-1'>
            <span> <IoCartOutline /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex justify-center items-center absolute -top-2 -right-3 '>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div className='text-3xl rounded-lg border cursor-pointer hover:bg-green-50 p-1'>
            <CiUser />
          </div>

          <div>
            <button className='px-3 py-1 rounded-full text-white bg-green-500 hover:bg-green-600'>
              Login
              </button>
          </div>

        </div>

      </div>

    </header>
  )
}

export default Header;