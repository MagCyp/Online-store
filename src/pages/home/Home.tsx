import { FC, useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import HeroScreenFirst from '@components/heroScreens/heroScreenFirst/HeroScreenFirst';
import HeroScreenSecond from '@components/heroScreens/heroScreenSecond/HeroScreenSecond';
import Carousel from '@components/carousel/Carousel';
import ShopByCategory from '@components/shopByCategory/ShopByCategory';
import AboutUs from '@components/aboutUs/AboutUs';
import ClientFeedback from '@components/clientFeedback/ClientFeedback';
import DynamicBackgroundEffects from '@components/dynamicBackgroundEffects/DynamicBackgroundEffects';

import 'swiper/css';
import 'swiper/css/free-mode';

const Home: FC = () => {
  const sliderRef = useRef<SwiperRef>(null);

  const [y, setY] = useState<number>(0);

  const handleNext = () => {
    sliderRef.current?.swiper?.slideNext();
  };

  const handlePrev = () => {
    sliderRef.current?.swiper?.slidePrev();
  };

  const scrollToY = () => {
    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
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
            onClick={scrollToY}
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
        <ShopByCategory
          setY={y => {
            setY(y);
          }}
        />
        <AboutUs />
        <ClientFeedback />
      </DynamicBackgroundEffects>
    </div>
  );
};

export default Home;
