import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '@components/container/Container';
import CustomInput from '@/components/customInput/Input';
import Button from '@components/button/Button';

import { validateEmail } from '@utils/validation/validation';

import { IItems } from '@components/footer/types';

import styles from '@components/footer/Footer.module.scss';

const popularCategoriesItems: IItems[] = [
  { id: 1, title: 'Mice', href: '/catalog/Mice' },
  { id: 2, title: 'Headsets', href: '/catalog/Headsets' },
  { id: 3, title: 'Keyboards', href: '/catalog/Keyboards' },
];

const aboutUsItems: IItems[] = [
  { id: 1, title: 'Cookie Policy', href: '/' },
  { id: 2, title: 'Payment Methods', href: '/' },
  { id: 3, title: 'Privacy policy', href: '/' },
];

const followUsItems: IItems[] = [
  { id: 1, title: 'Facebook', href: '/' },
  { id: 2, title: 'Twitter', href: '/' },
  { id: 3, title: 'Instagram', href: '/' },
];

const Footer: FC = () => {
  const [email, setEmail] = useState<string>('');

  return (
    <div className={styles['bg-wrapper']}>
      <Container>
        <div className={styles['updates-wrapper']}>
          <div className={styles['title-wrapper']}>
            <h5 className="regular">Get our latest updates</h5>
          </div>
          <div className={styles['subscribe-wrapper']}>
            <div className={styles['input-wrapper']}>
              <CustomInput
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email"
                validate={validateEmail}
              />
            </div>
            <div className={styles['button-wrapper']}>
              <Button
                fullWidth={true}
                className="primary medium"
                type="submit"
                text="Subscribe"
              />
            </div>
          </div>
        </div>
        <div className={styles['store-wrapper']}>
          <div className={styles['store-text-wrapper']}>
            <h6>Gaming store</h6>
            <p className="regular s">
              If you love gaming and esports, then you have come to the right
              place! In our store, we constantly keep an eye on what`s new in
              the gaming industry and study the market to offer you the best.
            </p>
          </div>
          <div className={styles['categories-wrapper']}>
            <div className={styles['popular-wrapper']}>
              <p className={`${styles['categories-title']} bold l`}>
                Popular categories
              </p>
              {popularCategoriesItems.map(item => (
                <Link key={item.id} to={item.href}>
                  <p className="medium s">{item.title}</p>
                </Link>
              ))}
            </div>
            <div className={styles['about-wrapper']}>
              <p className={`${styles['categories-title']} bold l`}>About us</p>
              {aboutUsItems.map(item => (
                <Link key={item.id} to={item.href}>
                  <p className="medium s">{item.title}</p>
                </Link>
              ))}
            </div>
            <div className={styles['follow-wrapper']}>
              <p className={`${styles['categories-title']} bold l`}>
                Follow us
              </p>
              {followUsItems.map(item => (
                <Link key={item.id} to={item.href}>
                  <p className="medium s">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['logo-wrapper']}>
          <div className={styles['logo']}>
            <a href="/">
              <h5 className="regular">Logo</h5>
            </a>
          </div>
          <p className="regular m">© 2024 Game store. All rights reserved</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
