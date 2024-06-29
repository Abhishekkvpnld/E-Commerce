import { useEffect } from 'react';
import { CiUser } from 'react-icons/ci';
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ROLE } from '../../common/role';

const AdminPanel = () => {

    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user,navigate]);

    return (
        <div className='min-h-[calc(100vh-100px)] bg-green-50 md:flex hidden'>
            <aside className='bg-slate-200 min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col mt-4'>
                    <div className='text-3xl w-20 h-20 rounded-full border-black bg-slate-300 cursor-pointer hover:bg-green-50 items-center flex relative justify-center'>
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
                    <nav className='grid px-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-violet-800 hover:text-white'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-violet-800 hover:text-white'>All Products</Link>
                        <Link to={"all-orders"} className='px-2 py-1 hover:bg-violet-800 hover:text-white'>All Orders</Link>
                    </nav>
                </div>

            </aside>


            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel;