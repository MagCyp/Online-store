import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RangeSlider from '@components/rangeSlider/RangeSlider';
import DropDown from '@components/dropDown/DropDown';
import CheckBox from '@components/checkBox/CheckBox';

import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';

import {
  setMinMax,
  toggleSale,
  setSelected,
  toggleStock,
} from '@store/slices/catalog/catalogSlice';

import { Props } from '@pages/catalog/sideBar/types';

import styles from '@pages/catalog/sideBar/SideBar.module.scss';

interface filtersDataProps {
  brands: string[];
  price: { min_price: number; max_price: number };
  isSale: boolean[];
  isPresent: boolean[];
  characteristics: Record<string, string[]>;
}

const SideBar: FC<Props> = ({ loadProduct }) => {
  const [filters, setFilters] = useState<filtersDataProps>();
  const [newFilters, setNewFilters] = useState<filtersDataProps>();
  const { category } = useParams();
  const catalog = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  const fetchData = async (request?: string) => {
    try {
      const queryString = request ? `&${request}` : '';
      const url = `http://localhost:8080/products/filters?category.name=${category}${queryString}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createRequest = () => {
    const selectedList = catalog.selectedList.join('&');
    const sortBy = catalog.sortBy;
    const inSale = catalog.inSale;
    const inStock = catalog.inStock;
    const price_min = catalog.min;
    const price_max = catalog.max;

    return `${selectedList}&${sortBy}&price=${price_min}&price=${price_max}&${inSale}&${inStock}`;
  };

  useEffect(() => {
    const setData = async () => {
      const filtersData: filtersDataProps = await fetchData(createRequest());

      if (filtersData) {
        setNewFilters(filtersData);
      }
    };

    setData();
    loadProduct(createRequest());
  }, [catalog]);

  useEffect(() => {
    const setData = async () => {
      const filtersData: filtersDataProps = await fetchData();

      if (filtersData) {
        setFilters(filtersData);
        dispatch(
          setMinMax([filtersData.price.min_price, filtersData.price.max_price]),
        );
      }
    };

    setData();
  }, []);

  const renderCharacteristics = (
    mainObject: Record<string, string[]>,
    secondObject: Record<string, string[]> | undefined,
  ) => {
    return Object.entries(mainObject).map(([key, values]) => {
      return (
        <DropDown header={key} key={key}>
          {values.map(value => {
            const isDisabled =
              secondObject !== undefined &&
              Object.keys(secondObject).length > 0 &&
              !secondObject[key]?.includes(value);

            const setChecked = isDisabled ? false : undefined;

            return (
              <CheckBox
                label={value}
                key={value}
                small
                disabled={isDisabled}
                setChecked={setChecked}
                getIsChecked={isChecked => {
                  if (isChecked && isDisabled) {
                    dispatch(
                      setSelected({
                        key: key,
                        value: value,
                        type: 'characteristics',
                      }),
                    );
                  }
                }}
                onChange={() =>
                  dispatch(
                    setSelected({
                      key: key,
                      value: value,
                      type: 'characteristics',
                    }),
                  )
                }
              />
            );
          })}
        </DropDown>
      );
    });
  };

  const renderBrands = (brands: string[], newBrands: string[] | undefined) => {
    return (
      <DropDown header="Brands">
        {brands.map(brand => {
          const isDisabled =
            newBrands !== undefined && !newBrands.includes(brand);

          const setChecked = isDisabled ? false : undefined;

          return (
            <CheckBox
              small
              label={brand}
              disabled={isDisabled}
              setChecked={setChecked}
              getIsChecked={isChecked => {
                if (isChecked && isDisabled) {
                  dispatch(
                    setSelected({
                      key: 'name',
                      value: brand,
                      type: 'brand',
                    }),
                  );
                }
              }}
              key={brand}
              onChange={() =>
                dispatch(
                  setSelected({
                    key: 'name',
                    value: brand,
                    type: 'brand',
                  }),
                )
              }
            />
          );
        })}
      </DropDown>
    );
  };

  return (
    <div className={styles['sidebar-container']}>
      <h6>Filters:</h6>
      <DropDown header="Price">
        <RangeSlider
          price_min={newFilters?.price.min_price || 0}
          price_max={newFilters?.price.max_price || 0}
        />
      </DropDown>
      {filters && renderBrands(filters.brands, newFilters?.brands)}
      {filters &&
        renderCharacteristics(
          filters.characteristics,
          newFilters?.characteristics,
        )}
      <CheckBox
        label="In stock"
        small
        onChange={() => dispatch(toggleStock())}
      />
      <CheckBox label="In sale" small onChange={() => dispatch(toggleSale())} />
    </div>
  );
};

export default SideBar;
