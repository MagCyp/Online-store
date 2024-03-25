import { FC, useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperRef, SwiperClass } from 'swiper/react';

import Container from '@components/container/Container';
import IconButton from '@components/iconButton/IconButton';
import ArrowLeft from '@components/icons/ArrowLeft';
import ArrowRight from '@components/icons/ArrowRight';
import ProductCard from '@components/productCard/ProductCard';
import DataLoading from '@components/dataLoading/DataLoading';
import DataError from '@components/dataError/DataError';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { fetchAllProducts } from '@/store/data/allProducts/asyncAction';
import { fetchMostPurchaseProducts } from '@/store/data/mostPurchaseProducts/asyncAction';

import { ISlideBegOrNot } from '@components/carousel/types';

import styles from '@components/carousel/Carousel.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const tabs: string[] = ['New', 'Best sellers', 'Recommended'];

const Carousel: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activePaginationTab, setActivePaginationTab] = useState<number>(0);
  const [slideBegOrNot, setSlideBegOrNot] = useState<ISlideBegOrNot>({
    isFirst: true,
    isLast: false,
  });
  const sliderRef = useRef<SwiperRef>(null);
  const dispatch = useAppDispatch();
  const { dataProducts, dataMostPurchase, status } = useAppSelector(
    state => state.products,
  );

  const data = [...dataProducts, ...dataMostPurchase];

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current?.swiper?.slideTo(
        sliderRef.current.swiper.activeIndex + 4,
      );

      const newIndex = Math.ceil(sliderRef.current.swiper.activeIndex / 4);

      setActivePaginationTab(newIndex);
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current?.swiper?.slideTo(
        sliderRef.current.swiper.activeIndex - 4,
      );

      const newIndex = Math.ceil(sliderRef.current.swiper.activeIndex / 4);

      setActivePaginationTab(newIndex);
    }
  };

  const handlePaginationClick = (index: number) => {
    setActivePaginationTab(index);

    if (sliderRef.current) {
      sliderRef.current.swiper.slideTo(index * 4);
    }
  };

  const onSlideChange = (swiper: SwiperClass) => {
    setSlideBegOrNot({
      isFirst: swiper.isBeginning,
      isLast: swiper.isEnd,
    });
  };

  const fetchDataByTab = (tabIndex: number) => {
    if (tabIndex === 0) {
      dispatch(
        fetchAllProducts({
          page: 0,
          size: 12,
          sort: 'createdAt,DESC',
        }),
      );
      setActivePaginationTab(0);
    }

    if (tabIndex === 1) {
      dispatch(fetchMostPurchaseProducts());
      setActivePaginationTab(0);
    }

    setSlideBegOrNot({
      isFirst: true,
      isLast: false,
    });
  };

  const { isLast, isFirst } = slideBegOrNot;

  useEffect(() => {
    if (status !== 'loading' && status !== 'error') {
      fetchDataByTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        page: 0,
        size: 12,
      }),
    );
  }, []);

  return (
    <div className={styles['bg-wrapper']}>
      {status === 'loading' ? (
        <DataLoading />
      ) : status === 'error' ? (
        <DataError />
      ) : (
        <>
          <Container>
            <div className={styles['categories-wrapper']}>
              {tabs.map((item, index) => (
                <p
                  className={`${styles.category} regular l ${
                    activeTab === index
                      ? `${styles['active-category']} bold l`
                      : ''
                  }`}
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    fetchDataByTab(index);
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </Container>
          <div className={styles['cards-wrapper']}>
            <div className={styles['card']}>
              <div className={styles['icon']}>
                <IconButton
                  type="button"
                  className="outline"
                  isDisabled={isFirst && true}
                  icon={<ArrowLeft size="large" />}
                  onClick={handlePrev}
                />
              </div>
              <Swiper
                className={styles['swiper-wrapper']}
                slidesPerView={4}
                spaceBetween={32}
                ref={sliderRef}
                onSlideChange={onSlideChange}
                navigation={false}
              >
                {data.map(item => (
                  <SwiperSlide key={item.id} className={styles['swiper-slide']}>
                    <ProductCard
                      key={item.id}
                      brand={item.brand?.name}
                      name={item.name}
                      shortDescription={item.shortDescription}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      id={item.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={styles['icon']}>
                <IconButton
                  type="button"
                  className="outline"
                  isDisabled={isLast && true}
                  icon={<ArrowRight size="large" />}
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>
          <div className={styles['pagination-circle-wrapper']}>
            {[0, 1, 2].map(index => (
              <div
                key={index}
                className={`${styles['pagination-circle']} ${
                  activePaginationTab === index &&
                  styles['active-pagination-circle']
                }`}
                onClick={() => handlePaginationClick(index)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
