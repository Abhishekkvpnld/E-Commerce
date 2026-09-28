
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProducts from '../components/HorizontalCardProducts';
import { VerticalCardProduct } from '../components/VerticalCardProduct';
import CompactProductCard from '../components/CompactProductCard';
import FeaturedProductCard from '../components/FeaturedProductCard';
import ShowcaseProductCard from '../components/ShowcaseProductCard';

const Home = () => {
  return (
    <div className='px-2 sm:px-4 md:px-8'>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProducts category={"watches"} heading={"Brand Watches"} />
      <HorizontalCardProducts category={"TWS"} heading={"Top TWS"} />
      <HorizontalCardProducts category={"tablet"} heading={"Premium Tablets"} />


      <VerticalCardProduct category={"mobiles"} heading={"Popular Mobile Phones"} />
      <VerticalCardProduct category={"laptops"} heading={"Laptops"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <ShowcaseProductCard category={"camera"} heading={"Camera & Photography"} />
      <FeaturedProductCard category={"earphones"} heading={"Wired Earphones"} />
      <FeaturedProductCard category={"speaker"} heading={"Bluetooth Speakers"} />
      <CompactProductCard category={"refrigerator"} heading={"Refrigerators"} />
      <CompactProductCard category={"AC"} heading={"Air Conditioner"} />
    </div>
  )
}

export default Home;