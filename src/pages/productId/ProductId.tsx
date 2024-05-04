import Container from '@/components/container/Container';
import DynamicBackgroundEffects from '@/components/dynamicBackgroundEffects/DynamicBackgroundEffects';
import React, { FC, useEffect } from 'react';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';

import styles from '@pages/productId/ProductId.module.scss';
import StarFull from '@components/icons/StarFull';
import StarEmpty from '@components/icons/StarEmpty';
import HeartOpacity from '@components/icons/HeartOpacity';
import ProductDropDown from '@components/productDropDown/ProductDropDown';
import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';
import { getProductById } from '@store/slices/productId/productIdSlice';
import ProgressIndicator from '@components/progressIndicator/ProgressIndicator';
import Check from '@components/icons/Check';

const items: { id: number; title: string; desc: string }[] = [
  {
    id: 0,
    title: 'Ergonomic design',
    desc:
      'The mouse&apos;s ergonomic shape is crafted for both palm and claw grip styles, providing comfort\n' +
      '                    and reducing fatigue during prolonged use.',
  },
  {
    id: 1,
    title: 'Ergonomic design',
    desc:
      'The mouse&apos;s ergonomic shape is crafted for both palm and claw grip styles, providing comfort\n' +
      '                    and reducing fatigue during prolonged use.',
  },
  {
    id: 2,
    title: 'Ergonomic design',
    desc:
      'The mouse&apos;s ergonomic shape is crafted for both palm and claw grip styles, providing comfort\n' +
      '                    and reducing fatigue during prolonged use.',
  },
];

const ProductId: FC = () => {
  const { category, id } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.productId);

  const fiveStarReviews = () => {
    const fiveStar = data?.reviews?.filter(review => review.rate === 5) ?? [];
    return fiveStar.length;
  };

  useEffect(() => {
    dispatch(getProductById(id!));
  }, [dispatch, id]);


  const str: string[] = ['New, Old'];
  return (
    <DynamicBackgroundEffects>
      <Container>
        <div className={styles['product-container']}>
          <div className={styles['breadcrumb']}>
            <Breadcrumb category={category ?? ''} name={data.name ?? ''} />
          </div>
          <div className={styles['content']}>
            <div className={styles['product-image-container']}>
              <img
                className={styles['main-image']}
                src={data.imageUrl}
                alt="img"
              />
              <div className={styles['images-container']}>
                <img
                  className={styles['images']}
                  src={data.imageUrl}
                  alt="img"
                />
                <img
                  className={styles['images']}
                  src={data.imageUrl}
                  alt="img"
                />
                <img
                  className={styles['images']}
                  src={data.imageUrl}
                  alt="img"
                />
                <img
                  className={styles['images']}
                  src={data.imageUrl}
                  alt="img"
                />
                <img
                  className={styles['images']}
                  src={data.imageUrl}
                  alt="img"
                />
              </div>
            </div>

            <div className={styles['product-details-container']}>
              <div className={styles['rate-box']}>
                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarEmpty size={'small'} />
                </div>
                <div className={styles['rate-and-reviews']}>
                  <div className={styles['rate']}>{data.averageRate}</div>
                  <div className={styles['reviews']}>
                    {data && data.reviews && (
                      <>({data.reviews.length} Reviews)</>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles['product-desc-box']}>
                <div className={styles['product-title']}>{data.brand}</div>
                <div className={styles['product-model']}>{data.name}</div>
                <div className={styles['product-description']}>
                  {data.shortDescription}
                </div>
              </div>

              <div className={styles['product-price-box']}>
                <div className={styles['product-price']}>${data.price}</div>
                {data.priceWithSale && (
                  <>
                    <div className={styles['product-sale']}>
                      ${data.priceWithSale}
                    </div>
                    <div className={styles['sale']}>Sale</div>
                  </>
                )}
              </div>

              <div className={styles['color-box']}>
                <div className={styles['color-picker']}>
                  <div className={styles['color']} />
                  <div className={styles['color']} />
                  <div className={styles['color']} />
                </div>
                <div className={styles['color-text']}>Color</div>
              </div>

              <div className={styles['quantity-box']}>
                <div className={styles['row']}>
                  <input className={styles['input-field']} type="number" />
                  <button className={styles['favorite']}>
                    <div className={styles['favorite-content']}>
                      <HeartOpacity size={'small'} />
                      Favorite
                    </div>
                  </button>
                </div>
                <button className={styles['add-to-cart']}>Add to cart</button>
              </div>
              <ProductDropDown header={'Specs & Details'}>
                <p className={styles['characteristics-p']}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eaque eveniet excepturi impedit perspiciatis vitae!
                </p>
              </ProductDropDown>
              <ProductDropDown header={'Compatibility'}>
                <p className={styles['characteristics-p']}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eaque eveniet excepturi impedit perspiciatis vitae!
                </p>
              </ProductDropDown>
              <ProductDropDown header={'In the Box'}>
                <p className={styles['characteristics-p']}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eaque eveniet excepturi impedit perspiciatis vitae!
                </p>
              </ProductDropDown>
              <ProductDropDown header={'Warranty'}>
                <p className={styles['characteristics-p']}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eaque eveniet excepturi impedit perspiciatis vitae!
                </p>
              </ProductDropDown>
            </div>
          </div>

          <div className={styles['key-features']}>
            <p>Key features</p>
            <hr />
            <div className={styles['items-wrapper']}>
              {items.map(item =>
                item.id % 2 === 0 ? (
                  <div key={item.id} className={styles['product-features']}>
                    <div className={styles['gray-block']} />
                    <div className={styles['column-features']}>
                      <div className={styles['feature-box']}>
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={item.id} className={styles['product-features']}>
                    <div
                      className={styles['column-features']}
                      style={{ alignItems: 'flex-start' }}
                    >
                      <div className={styles['feature-box']}>
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                    <div className={styles['gray-block']} />
                  </div>
                ),
              )}
              ))
            </div>
          </div>

          <div className={styles['customer-reviews-container']}>
            <div className={styles['customer-reviews-left']}>
              <h1>Customer Reviews</h1>
              <div className={styles['stars-box']}>
                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                </div>
                <div className={styles['avg-rate']}>{data.averageRate}</div>
              </div>
              <p>
                {data && data.reviews && (
                  <> Based on {data.reviews.length} reviews</>
                )}
              </p>
            </div>

            <div className={styles['customer-reviews-right']}>

              <div className={styles['rate-indicator']}>

                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                </div>

                <ProgressIndicator width={80} />

                <div className={styles['reviews-count']}>{fiveStarReviews()}</div>
              </div>

              <div className={styles['rate-indicator']}>

                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarEmpty size={'small'} />
                </div>

                <ProgressIndicator width={80} />

                <div className={styles['reviews-count']}>{fiveStarReviews()}</div>
              </div>

              <div className={styles['rate-indicator']}>

                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarEmpty size={'small'} />
                  <StarEmpty size={'small'} />
                </div>

                <ProgressIndicator width={80} />

                <div className={styles['reviews-count']}>{fiveStarReviews()}</div>
              </div>

              <div className={styles['rate-indicator']}>

                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarFull size={'small'} />
                  <StarEmpty size={'small'} />
                  <StarEmpty size={'small'} />
                  <StarEmpty size={'small'} />
                </div>

                <ProgressIndicator width={80} />

                <div className={styles['reviews-count']}>{fiveStarReviews()}</div>
              </div>

              <div className={styles['rate-indicator']}>

                <div className={styles['stars']}>
                  <StarFull size={'small'} />
                  <StarEmpty size={'small'} />
                  <StarEmpty size={'small'} />
                  <StarEmpty size={'small'} />
                  <StarEmpty size={'small'} />
                </div>

                <ProgressIndicator width={80} />

                <div className={styles['reviews-count']}>{fiveStarReviews()}</div>
              </div>
            </div>
          </div>

          <div className={styles['customer-review-box']}>
            <div className={styles['customer-column']}>
              <div className={styles['stars']}>
                <StarFull size={'small'} />
                <StarEmpty size={'small'} />
                <StarEmpty size={'small'} />
                <StarEmpty size={'small'} />
                <StarEmpty size={'small'} />
              </div>
              <h3>Natalie S.</h3>
              <span>Aug 24, 2023</span>
              <div className={styles['verified']}>
                <Check size={'small'} color={'#F6F6F7'}/>
                <span>Verified</span>
              </div>
            </div>


            <div className={styles['review']}>
              <h2>Unmatched Precision and Style!</h2>
              <p>I&apos;ve been using the QuantumX Pro for a month now, and I&apos;m blown away by its precision and customizable RGB lighting. The ergonomic design is perfect for my long gaming sessions. A must-have for serious gamers!</p>
            </div>

          </div>

          <h3 className={styles['recommended-product']}>Recommended product</h3>

          <div className={styles['recommended-product-row']}>

            <div className={styles['product-card']}>
              <div className={styles['img-box']} />
              <span>Brand</span>
              <h2>Product name</h2>
              <p>Day-long comfort, great for small to medium-sized hands.</p>
              <h3>$132</h3>
            </div>

            <div className={styles['product-card']}>
              <div className={styles['img-box']} />
              <span>Brand</span>
              <h2>Product name</h2>
              <p>Day-long comfort, great for small to medium-sized hands.</p>
              <h3>$132</h3>
            </div>

            <div className={styles['product-card']}>
              <div className={styles['img-box']} />
              <span>Brand</span>
              <h2>Product name</h2>
              <p>Day-long comfort, great for small to medium-sized hands.</p>
              <h3>$132</h3>
            </div>

            <div className={styles['product-card']}>
              <div className={styles['img-box']} />
              <span>Brand</span>
              <h2>Product name</h2>
              <p>Day-long comfort, great for small to medium-sized hands.</p>
              <h3>$132</h3>
            </div>
          </div>

        </div>
      </Container>
    </DynamicBackgroundEffects>
  );
};

export default ProductId;
