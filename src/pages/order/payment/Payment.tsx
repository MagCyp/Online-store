/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';

import Container from '@components/container/Container';
import RadioButton from '@components/radioButton/RadioButton';
import WayForPayInline from '@components/icons/WayForPayInline';
import Button from '@components/button/Button';
import WayForPayCircle from '@components/icons/WayForPayCircle';

import { useAppSelector } from '@hooks/redux/redux';

import styles from '@pages/order/payment/payment.module.scss';

const CryptoJS = require('crypto-js');
const PaymentText = ['WayForPay'];

interface IOrderData {
  merchantAccount: string;
  merchantDomainName: string;
  orderReference: string;
  orderDate: string;
  amount: string;
  currency: string;
  productName: string[];
  productPrice: string[];
  productCount: string[];
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  clientCountry: string;
  clientState: string;
  clientCity: string;
  clientAddress: string;
  returnUrl: string;
}

const Payment: FC = () => {
  const items = useAppSelector(state => state.cart.items);
  const paymentInfo = useAppSelector(state => state.payment);

  const [isActive, setIsActive] = useState<number>(0);
  const [orderData, setOrderData] = useState<IOrderData>({
    merchantAccount: 'test_merch_n1',
    merchantDomainName: 'indie-game-shop.netlify.app',
    orderReference: '',
    orderDate: Math.floor(Date.now() / 1000).toString(),
    amount: '',
    currency: 'USD',
    productName: [],
    productPrice: [],
    productCount: [],
    clientFirstName: 'aa',
    clientLastName: 'bb',
    clientEmail: 'cc',
    clientPhone: '+398213',
    clientCountry: 'dd',
    clientState: 'ee',
    clientCity: 'ff',
    clientAddress: 'gg',
    returnUrl: '',
  });

  useEffect(() => {
    const productNames: string[] = [];
    const productPrices: string[] = [];
    const productCounts: string[] = [];
    const itemList: { item_id: string; item_count: number }[] = [];

    items.forEach(item => {
      productNames.push(item.product.name);
      productPrices.push(item.product.price.toString());
      productCounts.push(item.quantity.toString());
      itemList.push({ item_id: item.product.id, item_count: item.quantity });
    });

    const itemsQueryString = itemList
      .map(item => `items_id=${item.item_id}&item_count=${item.item_count}`)
      .join('&');

    const totalAmount = productPrices
      .reduce(
        (acc, price, index) =>
          acc + parseFloat(price) * parseInt(productCounts[index]),
        0,
      )
      .toFixed(2);

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const merchantDomainName = `https://indie-game-shop.netlify.app/complete?${itemsQueryString}&orderId=${
      orderData.orderReference
    }&total=${totalAmount}&date=${encodeURIComponent(formattedDate)}`;

    setOrderData(prev => ({
      ...prev,
      merchantDomainName,
      productName: productNames,
      productPrice: productPrices,
      productCount: productCounts,
      // amount: totalAmount,
      amount: '0',
      returnUrl: merchantDomainName,
    }));
  }, []);

  useEffect(() => {
    if (paymentInfo) {
      setOrderData(prev => ({
        ...prev,
        clientFirstName: paymentInfo.firstName,
        clientLastName: paymentInfo.lastName,
        clientEmail: paymentInfo.email,
        clientPhone: paymentInfo.number,
        clientAddress: `${paymentInfo.street} ${paymentInfo.house} ${paymentInfo.apartment}`,
        clientCity: paymentInfo.city,
        clientCountry: 'Ukraine',
        clientState: paymentInfo.region,
        // amount: paymentInfo.total,
        amount: '0',
      }));
    }
  }, [paymentInfo]);

  const secretKey = 'flk3409refn54t54t*FNJRET';

  const generateSignature = () => {
    const {
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      productName,
      productCount,
      productPrice,
    } = orderData;

    const signatureString = [
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      ...productName,
      ...productCount,
      ...productPrice,
    ].join(';');

    return CryptoJS.HmacMD5(signatureString, secretKey).toString(
      CryptoJS.enc.Hex,
    );
  };

  useEffect(() => {
    console.log(orderData.returnUrl);
  }, [orderData.returnUrl]);

  const handleSubmit = () => {
    const signature = generateSignature();

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://secure.wayforpay.com/pay';

    Object.entries(orderData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(itemValue => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = `${key}[]`;
          input.value = itemValue;
          form.appendChild(input);
        });
      } else {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    });

    const signatureInput = document.createElement('input');
    signatureInput.type = 'hidden';
    signatureInput.name = 'merchantSignature';
    signatureInput.value = signature;
    form.appendChild(signatureInput);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Container>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h6 className="white">Payment method</h6>
          <RadioButton
            header="WayForPay"
            isActive={isActive === 0}
            setIsActive={() => setIsActive(0)}
            iconLeft={<WayForPayInline />}
          />
          <hr className={styles['hr']} />
          <p className="regular m white">
            You will be redirected to {PaymentText[isActive]} to complete your
            purchase securely.
          </p>
          <Button
            text="Pay"
            type="button"
            className="secondary medium"
            iconLeft={<WayForPayCircle />}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Container>
  );
};

export default Payment;
