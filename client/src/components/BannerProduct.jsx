import React, { useEffect, useState } from 'react';
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";


//Desktop Images
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

//Mobile Images
import imageMobile1 from "../assest/banner/img1_mobile.jpg";
import imageMobile2 from "../assest/banner/img2_mobile.webp";
import imageMobile3 from "../assest/banner/img3_mobile.jpg";
import imageMobile4 from "../assest/banner/img4_mobile.jpg";
import imageMobile5 from "../assest/banner/img5_mobile.png";



const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    const mobileImages = [
        imageMobile1,
        imageMobile2,
        imageMobile3,
        imageMobile4,
        imageMobile5
    ];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % desktopImages.length)
    };

    const prevImage = () => {
        if (currentImage < 0) {
            setCurrentImage(4);
        };
        setCurrentImage((prev) => (prev - 1));
    };


    useEffect(() => {
     const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % desktopImages.length);
        }, 5000);
        return ()=>clearInterval(interval);
    }, [currentImage]);


    return (
        <div className='mx-auto px-4 rounded '>
            <div className='h-48 md:h-72 w-full bg-slate-200 relative'>

                {/**Buttons */}
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl px-1'>
                        <button onClick={prevImage} className='shadow-md p-1 rounded-full bg-white hover:bg-opacity-50'><MdArrowBackIosNew /></button>
                        <button onClick={nextImage} className='shadow-md p-1 rounded-full bg-white hover:bg-opacity-50'><MdArrowForwardIos /></button>
                    </div>
                </div>


                {/**Tablet and Desktop version */}
                <div className='hidden md:flex w-full h-full overflow-hidden'>
                    {
                        desktopImages?.map((image, index) => (
                            <div className='w-full h-full min-w-full min-h-full translate' key={index}>
                                <img src={image} alt="img" key={index} className='w-full h-full rounded transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }} />
                            </div>
                        ))
                    }
                </div>

                {/**mobile version */}
                <div className='w-full h-full flex overflow-hidden md:hidden'>
                    {
                        mobileImages?.map((image, index) => (
                            <div className='w-full h-full min-w-full min-h-full translate' key={index}>
                                <img src={image} alt="img" key={index} className='w-full h-full object-cover rounded transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }} />
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct; 