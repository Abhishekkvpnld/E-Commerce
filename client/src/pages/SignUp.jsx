import React, { useState } from 'react';
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture:""
  });

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  };

  console.log(data);

  return (
    <section id='signup' className='w-full h-full'>
      <div className='mx-auto container p-5 '>

        <div className='bg-gray-300 w-full py-2 max-w-md mx-auto rounded p-3 '>


          <div className='w-20 h-20 mx-auto rounded-full mt-4'>
            <img src={loginIcon} alt="" />
          </div>


          <form onSubmit={handleLogin} className='flex flex-col gap-2'>

            <div className='grid'>
              <label>Username</label>
              <div className='bg-slate-100 p-2 rounded'>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  id=""
                  placeholder='enter username'
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Email</label>
              <div className='bg-slate-100 p-2 rounded'>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  id=""
                  placeholder='enter email'
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div >
              <label >Password</label>
              <div className='bg-slate-100 p-2 rounded flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleOnChange}
                  name="password"
                  id=""
                  placeholder='enter password'
                  className='w-full h-full outline-none bg-transparent' />

                <div className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {
                      showPassword ? <FaEyeSlash /> : <FaEye />
                    }
                  </span>
                </div>

              </div>

            </div>

            <div >
              <label >Confirm Password</label>
              <div className='bg-slate-100 p-2 rounded flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  name="confirm-password"
                  id=""
                  placeholder='confirm password'
                  className='w-full h-full outline-none bg-transparent' />

                <div className='cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>
                    {
                      showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                    }
                  </span>
                </div>

              </div>

            </div>

            <button className='bg-green-600 hover:bg-green-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4'>
              Sign Up
            </button>


          </form>

          <p className='p-2'>
            Already have account ?
            <Link to={"/login"} className='m-1 text-red-500 hover:text-blue-600 hover:underline'>
              Login
            </Link>
          </p>

        </div>

      </div>
    </section>
  )
}

export default Signup;