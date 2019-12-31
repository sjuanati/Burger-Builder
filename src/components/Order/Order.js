import React from 'react';
import styles from './Order.module.css';

const order = (props) => {

    // This is equivalent to the transformedIngredients from Burger.js, but a bit simpler
    // (turn ingredients into an array of objects)
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            });
    }

    const ingredientOutput = ingredients.map(ing => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px' 
                }}
            key={ing.name}> {ing.name} ({ing.amount}) </span>;
    })
 
    return (
    <div className={styles.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>EUR {props.price.toFixed(2)}</strong></p>
    </div>
    );
};

export default order;