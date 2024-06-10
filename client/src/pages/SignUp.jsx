import React, { useState } from 'react';
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBaseUrl from '../helpers/imageToBaseUrl';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from 'react-hot-toast';


const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: ""
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {
        const response = await axios.post(endPoints.singUp.url, data);

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login")
        };

        if (response.data.error) {
          console.log('error', response.data.message);
          toast.error(response.data.message);
        };

      } catch (error) {
        toast.error(error.response.data.message);
      };

    } else {
      toast.error("Please check the password and confirm passwor");
    };

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


  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const image = await imageToBaseUrl(file);
    setData((prev) => {
      return {
        ...prev,
        profilePicture: image
      };
    });
  };

  return (
    <section id='signup' className='w-full h-full'>
      <div className='mx-auto container p-5 '>

        <div className='bg-gray-300 w-full py-2 max-w-md mx-auto rounded p-3 '>


          <div className='w-20 h-20 mx-auto rounded-full mt-4 mb-2 relative flex justify-center overflow-hidden'>

            <div>
              <img src={data.profilePicture || loginIcon} alt="" />
            </div>

            <form className='text-xs text-center py-1 bg-opacity-80 bg-violet-100 w-full absolute bottom-0 cursor-pointer' >
              <label>
                <div className='cursor-pointer' >
                  Upload <br />
                  Photo
                </div>
                <input type="file" name="photo" id="photo" className='hidden' onChange={handleUploadPic} />
              </label>
            </form>

          </div>


          <form onSubmit={handleSignup} className='flex flex-col gap-2'>

            <div className='grid'>
              <label>Username</label>
              <div className='bg-slate-100 p-2 rounded'>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  required
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
                  required
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
                  required
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
                  name="confirmPassword"
                  id=""
                  required
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