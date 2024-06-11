import React, { useEffect, useState } from 'react';
import axios from "axios";
import endPoints from '../../common/configApi';
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateBox, setOpenUpdateBox] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: ""
  });

  const fetchAllUsers = async () => {
    const response = await axios.get(endPoints.all_users.url, { withCredentials: true });

    if (response?.data?.success) {
      setAllUsers(response?.data?.data);
      toast.success(response.data.message);
    };

    if (response?.data?.error) {
      toast.error(response.data.message)
    };

  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className='w-full border userTable'>
        <thead className='bg-black text-white'>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>PrifilePic</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            allUsers?.map((user, index) => (
              <tr className=' items-center' key={index}>
                <td>{index + 1}</td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format("LL")}</td>
                <td className='text-center flex justify-center'>{user?.profilePicture ? < img src={user?.profilePicture} alt="img" className='w-10 h-10 rounded-full' /> : <CiUser className='w-10 h-10 rounded-full' />}</td>
                <td ><button className='bg-slate-200 p-2 rounded-full hover:bg-green-400 hover:text-white'
                  onClick={() => {
                    setUserData(user);
                    setOpenUpdateBox(true);
                  }}>
                  {<FaEdit className='text-green-700 hover:text-white' />}
                </button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        openUpdateBox && ( 

          <ChangeUserRole
            userId={userData?._id}
            username={userData?.username}
            email={userData?.email}
            role={userData?.role}
            onClose={() => setOpenUpdateBox(false)}
            callFunc={fetchAllUsers} />

        )
      }
    </div>

  )
}

export default AllUsers;