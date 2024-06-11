import React, { useState } from 'react';
import { ROLE } from "../../common/role";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";


const ChangeUserRole = ({ username, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleSelectRole = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const response = await axios.post(endPoints.update_User_role.url, { username, email, role: userRole, userId }, { withCredentials: true });

    console.log("updated user role", response.data);

    if (response?.data?.success) {
      toast.success(response?.data?.message);
      onClose();
      callFunc(); 
    };

    if (response?.data?.error) {
      toast.error(response?.data?.message);
      onClose();
    };

  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center w-full h-full z-10 bg-slate-200 bg-opacity-60'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded'>


        <button className='bg-slate-100 block ml-auto p-1' onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className='pb-4 text-lg font-medium'>Change user Role</h1>

        <p>Name : {username}</p>
        <p>Email : {email}</p>

        <div className='flex items-center justify-between my-4'>
          <p>Role :</p>
          <select className='border px-4 py-1 bg-blue-100' value={userRole} onChange={handleSelectRole}>
            {
              Object.values(ROLE).map((role) => (
                <option value={role} key={role}>{role}</option>
              ))
            }
          </select>
        </div>

        <button className='w-fit block py-1 px-3 rounded bg-green-600 text-white hover:bg-green-700' onClick={updateUserRole}>Change Role</button>

      </div>
    </div>
  );
};

export default ChangeUserRole;