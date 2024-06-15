import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';

const Home = () => {
  return (
    <div className='px-8'>
      <CategoryList/>
      <BannerProduct/>
    </div>
  )
}

export default Home;