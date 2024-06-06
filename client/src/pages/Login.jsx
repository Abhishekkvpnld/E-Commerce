import React, { useState } from 'react';
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
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

    console.log(data)

    return (
        <section id='login' className='w-full h-full'>
            <div className='mx-auto container p-5 '>

                <div className='bg-gray-300 w-full py-2 max-w-md mx-auto rounded p-3 '>


                    <div className='w-20 h-20 mx-auto rounded-full mt-4'>
                        <img src={loginIcon} alt="" />
                    </div>

                    <form onSubmit={handleLogin} className='flex flex-col gap-2'>

                        <div className='grid'>
                            <label>Email</label>
                            <div className='bg-slate-100 p-2 rounded'>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
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
                                    required
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
                            <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-400'>Forgot password</Link>
                        </div>

                        <button className='bg-green-600 hover:bg-green-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4'>Login</button>
                    </form>

                    <p className='p-2'>Don't have account ?<Link to={"/signup"} className='m-1 text-red-500 hover:text-blue-600 hover:underline'>Sign up</Link></p>
                </div>

            </div>
        </section>
    )
}

export default Login;