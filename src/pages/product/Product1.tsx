import { FC, useEffect, useState } from 'react';

import Container from '@/components/container/Container';
import DynamicBackgroundEffects from '@/components/dynamicBackgroundEffects/DynamicBackgroundEffects';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import ProductDescBox from '@pages/product/productDescBox/ProductDescBox';
import RateBox from '@pages/product/rateBox/RateBox';
import PriceBox from '@pages/product/priceBox/PriceBox';
import ThumbnailSlider from '@pages/product/thumbnailSlider/ThumbnailSlider';
import ColorSelector from '@pages/product/colorSelector/ColorSelector';
import QuantitySelector from '@pages/product/quantitySelector/QuantitySelector';
import DropDownSection from '@pages/product/dropDownsSection/DropDownSection';

import Check from '@/components/icons/Check';
import Button from '@/components/button/Button';
import KeyFeatures from '@pages/product/keyFeatures/KeyFeatures';
import CustomerReviews from '@pages/product/customerReviews/CustomerReviews';
import img1 from '@pages/product/keyFeatures/images/keyFeature1.png';
import img2 from '@pages/product/keyFeatures/images/keyFeature2.png';
import img3 from '@pages/product/keyFeatures/images/keyFeature3.png';

import styles from '@pages/product/Product1.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';
import { fetchAllProducts } from '@/store/data/allProducts/asyncAction';
import ProductCard from '@/components/productCard/ProductCard';
import { IProduct } from '@/models/models';
import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton/ProductCardSkeleton';
import StarFull from '@/components/icons/StarFull';
import HeartOpacity from '@/components/icons/HeartOpacity';
import HeartWhite from '@/components/icons/HeartWhite';

const colors = ['white', 'azure', 'ghostwhite'];

const dropDownContent = [
  {
    header: 'Specs & Details',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    header: 'Compatibility',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa',
  },
  {
    header: 'In the Box',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer tincidunt. Cras dapibus. Vivamus elementum.',
  },
  {
    header: 'Warranty',
    content:
      'Lorem ipsum dolor. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero.',
  },
];

const keyFeaturesContent = [
  {
    imgSource: img1,
    title: 'Ergonomic design',
    description:
      "The mouse's ergonomic shape is crafted for both palm and claw grip styles, providing comfort and reducing fatigue during prolonged use.", // Fixed the HTML entity for apostrophe
  },
  {
    imgSource: img2,
    title: 'Precise sensor',
    description:
      "The mouse's sensor ensures precision tracking on most surfaces, giving users confidence during gaming or productivity tasks.", // Changed title and description to reflect variety
  },
  {
    imgSource: img3,
    title: 'Durable build',
    description:
      "The mouse's durable build ensures long-term use without compromising performance.", // Changed title and description for uniqueness
  },
];

const ratingData = {
  overallRating: 4.6,
  reviewQuantity: 137,
  opinions: [
    { rating: 5, quantity: 80 },
    { rating: 4, quantity: 65 },
    { rating: 3, quantity: 50 },
    { rating: 2, quantity: 35 },
    { rating: 1, quantity: 20 },
  ],
};

const handleColorSelect = (color: string) => {
  console.log('Selected color:', color);
};

const Product1: FC = () => {
  const handleQuantityChange = (quantity: number) => {
    console.log('Selected quantity:', quantity);
  };

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };

  const dispatch = useAppDispatch();

  const { dataProducts, status } = useAppSelector(state => state.products);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (dataProducts) setProducts(dataProducts);
  }, [dataProducts]);

  useEffect(() => {
    dispatch(fetchAllProducts({ page: 0, size: 4 }));
  }, [dispatch]);

  return (
    <DynamicBackgroundEffects>
      <Container>
        <div className={styles['product-container']}>
          <div className={styles['breadcrumb']}>
            <Breadcrumb name={'product'} />
            <div className={styles['product-content']}>
              <div className={styles['product-general_information']}>
                <div className={styles['thumbnail_image']}>
                  <ThumbnailSlider />
                </div>
                <div className={styles['product-details-container']}>
                  <RateBox rating={4.2} reviewsAmount={137} />
                  <ProductDescBox
                    brand="TechBlaze"
                    model="MX MASTER 3S"
                    shortDescription="Day-long comfort, great for small to medium-sized hands"
                  />
                  <PriceBox price={132} priceWithSale={164} />
                  {/* <ColorSelector
                    options={colorOptions}
                    onSelect={handleColorSelect}
                  /> */}

                  <ColorSelector
                    colors={colors}
                    // onSelect={handleColorSelect}
                  />
                  <div className={styles['quantity-favorite-button-wrapper']}>
                    <QuantitySelector
                      min={1}
                      max={5}
                      initialQuantity={1}
                      onQuantityChange={handleQuantityChange}
                    />
                    <Button
                      type="button"
                      text="Favorite"
                      className="secondary medium"
                      fullWidth={true}
                      iconLeft={
                        liked ? (
                          <HeartWhite size={'small'} />
                        ) : (
                          <HeartOpacity size={'small'} />
                        )
                      }
                      onClick={toggleLike}
                    />
                  </div>
                  <div className={styles['button-wrapper']}>
                    <Button
                      type="button"
                      text="Add to cart"
                      className="primary medium"
                      fullWidth={true}
                    />
                  </div>

                  <DropDownSection options={dropDownContent} />
                </div>
              </div>
            </div>
            <KeyFeatures features={keyFeaturesContent} />
            <CustomerReviews ratingData={ratingData} />
            <h3 className={styles['recommended-product']}>
              Recommended product
            </h3>
            <div className={styles['recommended-product-row']}>
              {products.length > 0 && status === 'success'
                ? products.map((product, index) => (
                    <ProductCard
                      key={index}
                      brand={product.brand}
                      name={product.name}
                      shortDescription={product.shortDescription}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      id={product.id}
                      rating={product.rating}
                      createdAt={product.createdAt}
                      priceWithSale={product.priceWithSale}
                    />
                  ))
                : Array.from({ length: 4 }, (_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
            </div>
          </div>
        </div>
      </Container>
    </DynamicBackgroundEffects>
  );
};

export default Product1;
