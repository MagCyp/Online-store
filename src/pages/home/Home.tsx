import { FC, useState } from 'react';

import HeroScreenFirst from '@components/heroScreens/heroScreenFirst/HeroScreenFirst';
import HeroScreenSecond from '@components/heroScreens/heroScreenSecond/HeroScreenSecond';
import Carousel from '@components/carousel/Carousel';

const Home: FC = () => {
  const [isLeftButtonClicked, setIsLeftButtonClicked] =
    useState<boolean>(false);
  const [isRightButtonClicked, setIsRightButtonClicked] =
    useState<boolean>(false);

  const handleLeftButtonClick = () => {
    setIsLeftButtonClicked(!isLeftButtonClicked);
    setIsRightButtonClicked(false);
  };

  const handleRightButtonClick = () => {
    setIsRightButtonClicked(!isRightButtonClicked);
    setIsLeftButtonClicked(false);
  };

  return (
    <div>
      {!isLeftButtonClicked && !isRightButtonClicked ? (
        <HeroScreenFirst
          onLeftButtonClick={handleLeftButtonClick}
          onRightButtonClick={handleRightButtonClick}
        />
      ) : (
        <HeroScreenSecond
          onLeftButtonClick={handleLeftButtonClick}
          onRightButtonClick={handleRightButtonClick}
        />
      )}
      <Carousel />
    </div>
  );
};

export default Home;
