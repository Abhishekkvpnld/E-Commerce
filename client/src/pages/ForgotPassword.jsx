import axios from 'axios';
import { useState } from 'react'
import endPoints from '../../common/configApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [OTP, SetOTP] = useState(null);
  const [emailCheck, setEmailCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(endPoints.ForgotPassword.url, { email: email });
      const responseData = response?.data;
      setLoading(false);


      if (responseData?.success) {
        setEmailCheck(true);
        setData(responseData?.data?.otp);
        toast.success(`${responseData?.message}...📩`);
      }

    } catch (error) {
      toast.error(error?.response?.data.message);
    }

  };

  const handleSubmitOTP = async () => {

    if (OTP == data) {

      navigate(`/change-password/${email}`)
      toast.success("success✅");

    } else {
      toast.error("Wrong OTP...🔐");
    }

  };


  return (
    <div className='min-h-[calc(100vh-100px)] mx-auto flex justify-center items-center'>

      {
        !emailCheck && (
          <div className='border-2 w-48 rounded-md md:w-96 h-32 p-2 gap-2 flex items-center justify-center shadow-md bg-slate-200'>

            <form onSubmit={handleSubmit}>
              <p className='text-lg font-semibold text-black'>Email</p>
              <div className='flex flex-col items-center justify-center'>
                <input className='bg-white m-1 w-40  md:w-80 border-2 rounded-md p-1 font-semibold' placeholder='Enter email' type="email" name="email" value={email} id="email" required onChange={(e) => setEmail(e.target.value)} />
                <button className={`border text-white py-1 px-6 rounded-md font-semibold bg-green-600 hover:bg-green-700' type='submit ${loading ? "cursor-wait" : "cursor-pointer"}`}>Next</button>
              </div>
            </form>

          </div>
        )
      }

      {
        emailCheck && (
          <div className='border-2 w-48 rounded-md md:w-96 h-32 p-2 gap-2 flex items-center justify-center shadow-md bg-slate-200'>

            <div>

              <p className='text-lg font-semibold text-black'>OTP</p>

              <div className='flex flex-col items-center justify-center'>
                <input className='bg-white m-1 w-40  md:w-80 border-2 rounded-md p-1 font-semibold' placeholder='Enter OTP' type="number" name="otp" value={OTP} id="otp" required onChange={(e) => SetOTP(e.target.value)} />
                <button className='border py-1 px-6 text-white rounded-md font-semibold bg-green-600 hover:bg-green-700 ' onClick={handleSubmitOTP}>Submit</button>
              </div>

            </div>

          </div>
        )
      }


    </div>
  );
};

export default ForgotPassword;