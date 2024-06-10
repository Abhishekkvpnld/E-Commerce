import React from 'react';
import { CiUser } from 'react-icons/ci';
import { useSelector } from "react-redux";
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {

    const user = useSelector((state) => state?.user?.user);

    return (
        <div className='min-h-[calc(100vh-96px)] flex'>
            <aside className='bg-slate-200 min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col mt-4'>
                    <div className='text-3xl w-20 h-20 rounded-full border cursor-pointer hover:bg-green-50 flex relative justify-center'>
                        {
                            user?.profilePicture ? (<img src={user?.profilePicture} className="w-20 h-20 rounded-full" alt={user?.username} />
                            ) : (<CiUser className="w-10 h-10 rounded-full" />)
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.username}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>
                {/* Navigation */}
                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-violet-800 hover:text-white'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-violet-800 hover:text-white'>All Products</Link>
                    </nav>
                </div>

            </aside>


            <main>
               <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel;