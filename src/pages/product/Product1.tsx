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

import { cartAdd } from '@store/data/cart/cartThunks';
import { IProduct } from '@/models/models';
import { fetchAllProducts } from '@/store/data/allProducts/asyncAction';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { WishListProduct, Product } from '@pages/product/types';

import styles from '@pages/product/Product1.module.scss';

const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
const path = '/products';
const baseURL = process.env.REACT_APP_API_URL;

const Product1: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [productData, setProductData] = useState<Product | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dataProducts, status } = useAppSelector(state => state.products);

  const dispatch = useAppDispatch();

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`${baseURL}/wishlist/remove/${id}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setLiked(false);
      } else {
        await axios.post(
          `${baseURL}/wishlist/add/${id}`,
          {},
          {
            headers: {
              Authorization: `${jwt}`,
            },
          },
        );

        setLiked(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleAdd = () => {
    dispatch(cartAdd([{ id: id!, quantity }]));
  };

  const checkIfProductIsLiked = async () => {
    try {
      const response = await axios.get(`${baseURL}/wishlist/list`, {
        headers: {
          Authorization: `${jwt}`,
        },
      });

      const wishlist = response.data;
      const isLiked = wishlist.some(
        (product: WishListProduct) => product.id === id,
      );
      setLiked(isLiked);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}${path}/${id}`);
        setProductData(response.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    checkIfProductIsLiked();
  }, [id]);

  useEffect(() => {
    if (dataProducts) setProducts(dataProducts);
  }, [dataProducts]);

  useEffect(() => {
    dispatch(fetchAllProducts({ page: 0, size: 4 }));
  }, [dispatch]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DynamicBackgroundEffects>
      <Container>
        <div className={styles['product-container']}>
          <div className={styles['breadcrumb']}>
            {productData && <Breadcrumb name={productData.name} />}
            <div className={styles['product-content']}>
              <div className={styles['product-general_information']}>
                <div className={styles['thumbnail_image']}>
                  {productData && (
                    <ThumbnailSlider images={productData.images} />
                  )}
                </div>
                <div className={styles['product-details-container']}>
                  {productData && (
                    <>
                      <RateBox
                        rating={productData.averageRate}
                        reviewsAmount={productData.reviews.length}
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
                      <ColorSelector colors={productData.colors} />
                      <div
                        className={styles['quantity-favorite-button-wrapper']}
                      >
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
                          onClick={() => handleAdd()}
                        />
                      </div>
                      <DropDownSection
                        characteristics={productData.characteristics}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            {productData && <KeyFeatures features={productData.features} />}
            {productData && (
              <CustomerReviews ratingData={productData.reviews} />
            )}
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
