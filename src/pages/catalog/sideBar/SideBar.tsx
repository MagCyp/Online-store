import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import RangeSlider from '@components/rangeSlider/RangeSlider';
import DropDown from '@components/dropDown/DropDown';
import CheckBox from '@components/checkBox/CheckBox';
import { useAppDispatch, useAppSelector } from '@hooks/redux/redux';
import {
  toggleSale,
  setSelected,
  toggleStock,
  setPriceRange,
  setMinMax,
  clearState,
} from '@store/slices/catalog/catalogSlice';
import styles from '@pages/catalog/sideBar/SideBar.module.scss';
import { fetchFiltersProducts } from '@/store/data/filtersProducts/asyncAction';
import { generateRequest } from '@/utils/CatalogPage/generateRequest';

interface filtersDataProps {
  brands: string[];
  price: { min_price: number; max_price: number };
  isSale: boolean[];
  isPresent: boolean[];
  characteristics: Record<string, string[]>;
}

interface Props {
  loadProducts: () => void;
}

const SideBar: FC<Props> = ({ loadProducts }) => {
  const [filters, setFilters] = useState<filtersDataProps>();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const { category } = useParams();
  const prevCategoryRef = useRef<string | undefined>();
  const catalog = useAppSelector(state => state.catalog);
  const { dataFilters, filtersStatus } = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();

  const fetchData = (withQuery = false) => {
    if (category) {
      const query = generateRequest(catalog);
      dispatch(
        fetchFiltersProducts({
          category: category,
          query: withQuery ? query : '',
        }),
      );
    }
  };

  const onAfterChange = () => {
    fetchData(true);
    setIsUpdated(true);
  };

  const handleClick = (key: string, value: string, type: string) => {
    dispatch(
      setSelected({
        key: key,
        value: value,
        type: type,
      }),
    );
    setShouldFetch(true);
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData(true);
      setIsUpdated(true);
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    if (filtersStatus === 'success' && !updated && dataFilters) {
      setFilters(dataFilters);
      dispatch(
        setPriceRange([
          dataFilters.price.min_price,
          dataFilters.price.max_price,
        ]),
      );
      dispatch(
        setMinMax([dataFilters.price.min_price, dataFilters.price.max_price]),
      );

      setIsUpdated(true);
      setUpdated(true);
    }
  }, [dataFilters, updated]);

  useEffect(() => {
    if (isUpdated) {
      loadProducts();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  useEffect(() => {
    prevCategoryRef.current = category;
  }, []);

  useEffect(() => {
    fetchData();

    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      setFilters(undefined);
      dispatch(clearState());
      setUpdated(false);
    }
  }, [category]);

  const renderCharacteristics = (
    mainObject: Record<string, string[]>,
    secondObject: Record<string, string[]> | undefined,
  ) => {
    return Object.entries(mainObject).map(([key, values]) => {
      return (
        <DropDown header={key} key={key}>
          {values.map(value => {
            const isDisabled =
              secondObject !== undefined && !secondObject[key]?.includes(value);
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
                onChange={() => handleClick(key, value, 'characteristics')}
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
              onChange={() => handleClick('name', brand, 'brand')}
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
        {filters && (
          <RangeSlider
            priceMin={filters?.price.min_price}
            priceMax={filters?.price.max_price}
            onChange={() => onAfterChange()}
          />
        )}
      </DropDown>
      {filters && renderBrands(filters.brands, dataFilters?.brands)}
      {filters &&
        renderCharacteristics(
          filters.characteristics,
          dataFilters?.characteristics,
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
