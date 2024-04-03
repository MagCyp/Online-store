import { FC, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import HeroScreenFirst from '@components/heroScreens/heroScreenFirst/HeroScreenFirst';
import HeroScreenSecond from '@components/heroScreens/heroScreenSecond/HeroScreenSecond';
import Carousel from '@components/carousel/Carousel';
import ShopByCategory from '@components/shopByCategory/ShopByCategory';
import AboutUs from '@components/aboutUs/AboutUs';
import ClientFeedback from '@components/clientFeedback/ClientFeedback';

import 'swiper/css';
import 'swiper/css/free-mode';
import DynamicBackgroundEffects from '@/components/dynamicBackgroundEffects/DynamicBackgroundEffects';

const Home: FC = () => {
  const sliderRef = useRef<SwiperRef>(null);

  const handleNext = () => {
    sliderRef.current?.swiper?.slideNext();
  };

  const handlePrev = () => {
    sliderRef.current?.swiper?.slidePrev();
  };

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        ref={sliderRef}
        loop={true}
      >
        <SwiperSlide>
          <HeroScreenFirst
            onLeftButtonClick={handlePrev}
            onRightButtonClick={handleNext}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroScreenSecond
            onLeftButtonClick={handlePrev}
            onRightButtonClick={handleNext}
          />
        </SwiperSlide>
      </Swiper>
      <DynamicBackgroundEffects>
        <Carousel />
        <ShopByCategory />
        <AboutUs />
        <ClientFeedback />
      </DynamicBackgroundEffects>
    </div>
  );
};

export default Home;
