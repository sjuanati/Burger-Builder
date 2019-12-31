import React from 'react';
import styles from './Order.module.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredients: ...</p>
        <p>Price: <strong>EUR 6.0</strong></p>
    </div>
);

export default order;