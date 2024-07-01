import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";




const ChangePassword = () => {

    const {email} = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({ password: "", confirmPassword: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (data.password === data.confirmPassword) {
                const response = await axios.post(endPoints.changePassword.url, { password: data.password, email: email }, { withCredentials: true });

                if (response?.data?.success) {
                    toast.success(response?.data?.message);
                    navigate("/login");
                }
            } else {
                toast.error("Password not matching...❌");
            }


        } catch (error) {
            toast.error(error?.response?.data?.message || error)
        }
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


    return (
        <section id='login' className='w-full h-full min-h-[calc(100vh-100px)] flex items-center justify-center'>
            <div className='mx-auto container p-5 flex flex-col items-center justify-center gap-5'>

                <div>
                    <h1 className='text-3xl font-semibold'>Change Password</h1>
                </div>


                <div className='w-full py-3 max-w-md mx-auto rounded p-6 border-2 shadow-md '>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>


                        <div >
                            <label className='font-semibold' >Password</label>
                            <div className=' p-2 rounded flex bg-slate-100 mt-1'>
                                <input
                                    type={showConfirmPassword ? "number" : "password"}
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    name="password"
                                    id="password"
                                    placeholder='Enter password'
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

                        <div >
                            <label className='font-semibold' >Confirm Password</label>
                            <div className=' p-2 rounded flex bg-slate-100 mt-1'>
                                <input
                                    type={showPassword ? "number" : "password"}
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder='enter confirm password'
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

                        <button className='bg-green-600 hover:bg-green-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4'>Submit</button>
                    </form>

                </div>

            </div>
        </section>
    )
}

export default ChangePassword;