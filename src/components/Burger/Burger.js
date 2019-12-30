import React from 'react';
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';


// We don't pass an array through props, but an object, so we can't use map. 
// We need to convert object to an array

const burger = (props) => {

    console.log(props);

    // Transform object into array of ingredients
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />;
        });
    // Take the given element and add to this array. It gives initially an empty array; otherwise, it is fulfilled with the corresponding ingredients
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please start adding ingredients! </p>
    }

    //console.log(transformedIngredients);

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

// Even not needed, this would transfer history, match and location to Burger, even it is
// not included in the routing (only direct components are routed, but not its children)
export default withRouter(burger);