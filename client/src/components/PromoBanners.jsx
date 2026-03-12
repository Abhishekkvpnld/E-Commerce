import { Link } from 'react-router-dom';
import promoElectronics from '../assest/banner/promo_electronics.png';
import promoWearables from '../assest/banner/promo_wearables.png';
import promoAppliances from '../assest/banner/promo_appliances.png';

/**
 * PromoBanners – renders one full-width banner OR two side-by-side banners.
 * Props:
 *   layout: "full" | "split"   (default "full")
 *   banners: array of { image, alt, link, tag, title, subtitle, cta, gradient }
 */
const PromoBanners = ({ layout = "full", banners = [] }) => {

    if (!banners.length) return null;

    if (layout === "split") {
        return (
            <div className='px-2 sm:px-4 md:px-8 my-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
                    {banners.slice(0, 2).map((banner, i) => (
                        <Link
                            key={i}
                            to={banner.link || "/"}
                            className='relative overflow-hidden rounded-2xl group block h-36 md:h-44'
                        >
                            {/* Background image */}
                            <img
                                src={banner.image}
                                alt={banner.alt}
                                className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                            />
                            {/* Overlay gradient */}
                            <div className={`absolute inset-0 ${banner.gradient || 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'}`} />
                            {/* Text content */}
                            <div className='relative z-10 p-4 md:p-5 h-full flex flex-col justify-center'>
                                {banner.tag && (
                                    <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 mb-1'>
                                        {banner.tag}
                                    </span>
                                )}
                                <h3 className='text-white font-extrabold text-base md:text-xl leading-tight drop-shadow'>
                                    {banner.title}
                                </h3>
                                {banner.subtitle && (
                                    <p className='text-white/80 text-xs md:text-sm mt-1 line-clamp-2'>{banner.subtitle}</p>
                                )}
                                {banner.cta && (
                                    <span className='mt-2 md:mt-3 inline-block self-start px-3 py-1 bg-white text-slate-800 text-xs font-bold rounded-full group-hover:bg-opacity-90 transition-all'>
                                        {banner.cta} →
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    // "full" layout – single spanning banner
    return (
        <div className='px-2 sm:px-4 md:px-8 my-6'>
            <Link
                to={banners[0].link || "/"}
                className='relative overflow-hidden rounded-2xl group block h-40 md:h-56'
            >
                <img
                    src={banners[0].image}
                    alt={banners[0].alt}
                    className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className={`absolute inset-0 ${banners[0].gradient || 'bg-gradient-to-r from-black/65 via-black/35 to-transparent'}`} />
                <div className='relative z-10 p-5 md:p-8 h-full flex flex-col justify-center max-w-lg'>
                    {banners[0].tag && (
                        <span className='text-xs font-bold uppercase tracking-widest text-white/75 mb-1.5'>
                            {banners[0].tag}
                        </span>
                    )}
                    <h2 className='text-white font-extrabold text-xl md:text-3xl leading-tight drop-shadow'>
                        {banners[0].title}
                    </h2>
                    {banners[0].subtitle && (
                        <p className='text-white/80 text-sm md:text-base mt-1.5'>{banners[0].subtitle}</p>
                    )}
                    {banners[0].cta && (
                        <span className='mt-3 md:mt-4 inline-block self-start px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full group-hover:bg-opacity-90 transition-all shadow'>
                            {banners[0].cta} →
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
};

/* ─── Pre-configured banner data ─────────────────────────────────────────── */

export const electronicsPromo = {
    image: promoElectronics,
    alt: 'Mobile & Laptop Sale',
    link: '/product-category?category=mobiles',
    tag: 'Limited Time Offer',
    title: 'Up to 50% Off on Mobiles & Laptops',
    subtitle: 'Shop the latest smartphones, ultrabooks and more.',
    cta: 'Shop Now',
    gradient: 'bg-gradient-to-r from-indigo-900/80 via-indigo-800/50 to-transparent',
};

export const wearablesPromo = {
    image: promoWearables,
    alt: 'Watches & TWS Sale',
    link: '/product-category?category=watches',
    tag: 'New Arrivals',
    title: 'Smart Watches & Premium TWS',
    subtitle: 'Explore the latest wearable tech.',
    cta: 'Explore',
    gradient: 'bg-gradient-to-r from-rose-900/80 via-orange-800/40 to-transparent',
};

export const appliancesPromo = {
    image: promoAppliances,
    alt: 'Home Appliances Sale',
    link: '/product-category?category=AC',
    tag: 'Best Deals',
    title: 'Home Appliances — ACs, Fridges & More',
    subtitle: 'Energy-saving appliances at unbeatable prices.',
    cta: 'View Deals',
    gradient: 'bg-gradient-to-r from-emerald-900/80 via-teal-800/40 to-transparent',
};

export default PromoBanners;
