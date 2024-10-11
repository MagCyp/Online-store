import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '@/components/button/Button';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import ColorSelector from '@pages/product/colorSelector/ColorSelector';
import Container from '@/components/container/Container';
import CustomerReviews from '@pages/product/customerReviews/CustomerReviews';
import DynamicBackgroundEffects from '@/components/dynamicBackgroundEffects/DynamicBackgroundEffects';
import DropDownSection from '@pages/product/dropDownsSection/DropDownSection';
import HeartOpacity from '@/components/icons/HeartOpacity';
import HeartWhite from '@/components/icons/HeartWhite';
import KeyFeatures from '@pages/product/keyFeatures/KeyFeatures';
import PriceBox from '@pages/product/priceBox/PriceBox';
import ProductCard from '@/components/productCard/ProductCard';
import ProductCardSkeleton from '@/components/skeletons/productCardSkeleton/ProductCardSkeleton';
import ProductDescBox from '@pages/product/productDescBox/ProductDescBox';
import QuantitySelector from '@pages/product/quantitySelector/QuantitySelector';
import RateBox from '@pages/product/rateBox/RateBox';
import ThumbnailSlider from '@pages/product/thumbnailSlider/ThumbnailSlider';

import { IProduct } from '@/models/models';
import { fetchAllProducts } from '@/store/data/allProducts/asyncAction';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import styles from '@pages/product/Product1.module.scss';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

const path = '/products';
const baseURL = process.env.REACT_APP_API_URL;

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

const Product1: FC = () => {
  const { id } = useParams<{ id: string }>(); // Отримуємо id з URL

  const handleQuantityChange = (quantity: number) => {
    console.log('Selected quantity:', quantity);
  };

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // Стан для завантаження
  const [productData, setProductData] = useState<any>(null); // Данні про продукт
  const [error, setError] = useState<string | null>(null); // Для збереження помилок

  const dispatch = useAppDispatch();

  const toggleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };

  const { dataProducts, status } = useAppSelector(state => state.products);
  const [products, setProducts] = useState<IProduct[]>([]);

  const checkIfProductIsLiked = async () => {
    try {
      const response = await axios.get(`${baseURL}/wishlist/list`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const wishlist = response.data;
      const isLiked = wishlist.some((product: any) => product.id === id);
      setLiked(isLiked);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Встановлюємо стан завантаження
        const response = await axios.get(`${baseURL}${path}/${id}`);
        setProductData(response.data);
        console.log(response);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false); // Завершуємо стан завантаження
      }
    };

    fetchProduct();
    checkIfProductIsLiked(); // Перевіряємо, чи є продукт у списку улюблених
  }, [id]);

  useEffect(() => {
    if (dataProducts) setProducts(dataProducts);
  }, [dataProducts]);

  useEffect(() => {
    dispatch(fetchAllProducts({ page: 0, size: 4 }));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DynamicBackgroundEffects>
      <Container>
        <div className={styles['product-container']}>
          <div className={styles['breadcrumb']}>
            <Breadcrumb name={productData.name} />
            <div className={styles['product-content']}>
              <div className={styles['product-general_information']}>
                <div className={styles['thumbnail_image']}>
                  <ThumbnailSlider images={productData.images} />
                </div>
                <div className={styles['product-details-container']}>
                  <RateBox
                    rating={productData.averageRate}
                    reviewsAmount={137}
                  />
                  <ProductDescBox
                    brand={productData.brand}
                    model={productData.name}
                    shortDescription={productData.shortDescription}
                  />
                  <PriceBox
                    price={productData.price}
                    priceWithSale={productData.priceWithSale}
                  />

                  <ColorSelector colors={colors} />
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
            <KeyFeatures features={productData.features} />
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
