import { FC, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import clientsIcon from '@/assets/images/clientFeedback/clientsIcon.png';

import Container from '@components/container/Container';
import SliderContent from '@components/clientFeedback/sliderContent/SliderContent';
import StarFull from '@components/icons/StarFull';
import IconButton from '@components/iconButton/IconButton';
import ArrowRight from '@components/icons/ArrowRight';
import ArrowLeft from '@components/icons/ArrowLeft';

import { IItems } from '@components/clientFeedback/types';

import styles from '@components/clientFeedback/ClientFeedback.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';

const items: IItems[] = [
  {
    id: 1,
    title: `I've been using the QuantumX Pro for a month now, and I'm blown away by its precision 
    and customizable RGB lighting. The ergonomic design is perfect for my long gaming sessions. A must-have for serious gamers!`,
    logo: 'https://miro.medium.com/v2/resize:fit:1200/0*XQfhtDq1sukXwKgn.jpg',
    userName: 'Yuriy',
    yearsExperience: 5,
    rating: 5,
  },
  {
    id: 2,
    title: `Hello everyone, I'm a young doter, I can recommend a mouse, hooks on pudge fly one in three`,
    logo: 'https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/0/302/302485/previews/people_5_child_sweatshirt_cotton_front_melangeburgundy_700.jpg',
    userName: 'Dmytro',
    yearsExperience: 5,
    rating: 5,
  },
  {
    id: 3,
    title: `I can recommend this item!`,
    logo: 'https://static.toiimg.com/photo/83890812.cms',
    userName: 'Andriy',
    yearsExperience: 5,
    rating: 3,
  },
];

const ClientFeedback: FC = () => {
  const sliderRef = useRef<SwiperRef>(null);

  const handleNext = () => {
    sliderRef.current?.swiper?.slideNext();
  };

  const handlePrev = () => {
    sliderRef.current?.swiper?.slidePrev();
  };

  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        <div className={styles['main-wrapper']}>
          <div className={styles['contant-wrapper']}>
            <h3 className={`${styles['client-title']} regular`}>
              Client feedback
            </h3>
            <p className={`${styles['client-description']} regular l`}>
              More than 2000 honest reviews. We do not do not edit or process
              customer reviews.
            </p>
            <img src={clientsIcon} alt="clients" />
            <div className={styles['reviews-wrapper']}>
              <StarFull size="small" />
              <span>
                <p className={`${styles['rating-description']} medium m`}>
                  4.6
                </p>
              </span>
              <span>
                <p className={`${styles['rating-description']} medium m`}>
                  (500+ Reviews)
                </p>
              </span>
            </div>
          </div>
          <div>
            <div className={styles['comments-wrapper']}>
              <IconButton
                type="button"
                className="outline"
                icon={<ArrowLeft size="large" />}
                onClick={handlePrev}
              />
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
                ref={sliderRef}
                loop={true}
              >
                {items.map(item => (
                  <SwiperSlide key={item.id}>
                    <SliderContent {...item} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <IconButton
                type="button"
                className="outline"
                icon={<ArrowRight size="large" />}
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClientFeedback;
