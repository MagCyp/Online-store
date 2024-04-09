import { FC, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import clientsIcon from '@/assets/images/clientFeedback/clientsIcon.png';

import Container from '@components/container/Container';
import SliderContent from '@components/clientFeedback/sliderContent/SliderContent';
import StarFull from '@components/icons/StarFull';
import IconButton from '@components/iconButton/IconButton';
import ArrowRight from '@components/icons/ArrowRight';
import ArrowLeft from '@components/icons/ArrowLeft';
import DataError from '@components/dataError/DataError';
import ClientFeedbackSkeleton from '@components/skeletons/clientFeedbackSkeleton/ClientFeedbackSkeleton';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { fetchReviews } from '@/store/data/reviews/asyncAction';

import styles from '@components/clientFeedback/ClientFeedback.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';

const ClientFeedback: FC = () => {
  const sliderRef = useRef<SwiperRef>(null);
  const dispatch = useAppDispatch();
  const { reviews, status } = useAppSelector(state => state.reviews);

  const handleNext = () => {
    sliderRef.current?.swiper?.slideNext();
  };

  const handlePrev = () => {
    sliderRef.current?.swiper?.slidePrev();
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  return (
    <div className={styles['bg-wrapper']}>
      {status === 'loading' ? (
        <Container>
          <ClientFeedbackSkeleton />
        </Container>
      ) : status === 'error' ? (
        <Container>
          <DataError />
        </Container>
      ) : (
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
                  loop={reviews.length > 1}
                >
                  {reviews.map(item => (
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
      )}
    </div>
  );
};

export default ClientFeedback;
