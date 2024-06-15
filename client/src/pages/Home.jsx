import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProducts from '../components/HorizontalCardProducts';

const Home = () => {
  return (
    <div className='px-8'>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProducts category={"airpodes"} heading={"Top Airpods"}/>
    </div>
  )
}

export default Home;