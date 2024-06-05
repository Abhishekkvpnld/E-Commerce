import React from 'react';
import loginIcon from "../assest/signin.gif";

const Login = () => {
    return (
        <section id='login'>
            <div className='mx-auto container p-2 '>

                <div className='bg-white w-full py-2 max-w-md mx-auto rounded '>


                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} alt="" />
                    </div>

                    <form action="">

                        <div className='grid'>
                            <label>Email</label>
                            <div className='w-full h-full outline-none'>
                                <input type="email" name="email" id="" placeholder='enter email' />
                            </div>
                        </div>

                        <div>
                            <label >Password</label>
                            <div className='w-full h-full outline-none'> 
                                <input type="password" name="password" id="" placeholder='enter password' />
                            </div>
                        </div>

                        <button>Login</button>
                    </form>

                </div>

            </div>
        </section>
    )
}

export default Login;