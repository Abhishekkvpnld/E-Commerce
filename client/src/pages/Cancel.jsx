import React from 'react';
import cancel from "../assest/cancel.gif";
import { useNavigate } from 'react-router-dom';


const Cancel = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/cart")
    }

    return (
        <div className='w-full h-96 min-h-[calc(100vh-100px)] flex items-center justify-center flex-col bg-white py-8' >
            <img src={cancel} width={"350px"} height={"350px"} alt="cancel" className='my-2 ' />
            <p className='text-red-700 text-xl font-bold'>Payment Cancelled <span className='rounded-full w-5 h-5 bg-slate-200 p-1'>❌</span></p>
            <button className='p-2 rounded-lg border-2 my-2 font-semibold text-slate-400 hover:bg-red-600 hover:text-white' onClick={handleNavigate}>Back to Cart</button>
        </div>

    )
}

export default Cancel;