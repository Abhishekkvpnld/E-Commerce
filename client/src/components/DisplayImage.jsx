import React from 'react';
import { IoCloseOutline } from "react-icons/io5";


const DisplayImage = ({ imageUrl, onClose }) => {
    return (
        <div className='fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded mx-auto flex'>


            <div className='flex justify-center p-4 max-w-[100vh] max-h-[100vh]'>
                    <img src={imageUrl} alt={"image"} />
                </div>

                <div className='border rounded w-10 h-10 ml-auto px-1 text-2xl hover:bg-slate-200 hover:text-red-600 flex items-center justify-center' onClick={onClose}>
                    <button> <IoCloseOutline /></button>
                </div>


            </div>
        </div>
    )
}

export default DisplayImage;