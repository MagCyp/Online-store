import { FC } from 'react';

import RangeSlider from '@components/rangeSlider/RangeSlider';
import DropDown from '@components/dropDown/DropDown';
import CheckBox from '@components/checkBox/CheckBox';

import { useAppDispatch } from '@hooks/redux/redux';

import { setSelected } from '@store/slices/catalog/catalogSlice';

import styles from '@pages/catalog/sideBar/SideBar.module.scss';

const options = [
  {
    name: 'filter1',
    values: [
      { id: 1, name: 'Alienware' },
      { id: 2, name: 'Logitech' },
      { id: 3, name: 'Razer' },
      { id: 4, name: 'Mad Catz' },
    ],
  },
  {
    name: 'filter2',
    values: [
      { id: 5, name: 'Windows' },
      { id: 6, name: 'Mac' },
      { id: 7, name: 'Chrome' },
    ],
  },
];

const SideBar: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles['sidebar-container']}>
      <h6>Filters:</h6>
      <DropDown header="Price">
        <RangeSlider />
      </DropDown>
      {options.map((item, index) => (
        <DropDown key={index} header={item.name}>
          {item.values.map(value => (
            <CheckBox
              key={value.id}
              label={value.name}
              small
              onChange={() => dispatch(setSelected(value.id))}
            />
          ))}
        </DropDown>
      ))}
    </div>
  );
};

export default SideBar;
