import React from 'react';
import styles from '@/components/checkout/Checkout.module.scss'
import Container from '@components/container/Container';

const Checkout: React.FC = () => {
    return ( 
    <Container>
        <div>
            <div className={styles['checkoutStages']}>
                
            </div>
        </div>
        </Container>
    )
}

export default Checkout;