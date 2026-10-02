import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const promos = [
  { title: '50% OFF', subtitle: 'Selected restaurants', icon: '🍕' },
  { title: 'SUPER DEALS', subtitle: 'Book your table today', icon: '🍔' },
  { title: '50% OFF', subtitle: 'Weekend dining offers', icon: '🍝' }
];

export default function RestaurantCarousel() {
  return (
    <Swiper className="promo-swiper" modules={[Autoplay, Pagination]} spaceBetween={18} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 3500 }} breakpoints={{ 600: { slidesPerView: 2 }, 900: { slidesPerView: 3 } }}>
      {promos.map(promo => <SwiperSlide key={promo.title + promo.subtitle}><div className="promo-card"><div className="promo-copy"><strong>{promo.title}</strong><span>{promo.subtitle}</span></div><div className="promo-food">{promo.icon}</div></div></SwiperSlide>)}
    </Swiper>
  );
}
