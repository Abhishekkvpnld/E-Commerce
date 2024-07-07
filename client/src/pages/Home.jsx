
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProducts from '../components/HorizontalCardProducts';
import { VerticalCardProduct } from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div className='px-8'>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProducts category={"watches"} heading={"Brand Watches"} />
      <HorizontalCardProducts category={"TWS"} heading={"Top TWS"} />
      <HorizontalCardProducts category={"tablet"} heading={"Premium Tablets"} />


      <VerticalCardProduct category={"mobiles"} heading={"Popular Mobile Phones"} />
      <VerticalCardProduct category={"laptops"} heading={"Laptops"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"speaker"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"} />
      <VerticalCardProduct category={"AC"} heading={"Air Conditioner"} />
    </div>
  )
}

export default Home;