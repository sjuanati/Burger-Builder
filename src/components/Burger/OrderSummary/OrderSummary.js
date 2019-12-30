import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

 // This could be a functional component, doesn't have to be a class
class OrderSummary extends Component {

    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}> 
                    {/* // style to Capitalise each ingredient */}
                    <span style={{textTransform: 'capitalize'}}> {ingKey} </span>: 
                    {this.props.ingredients[ingKey]} 
                </li> );
        });

        return (
            <Aux>
            <h3> Your Order </h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total Price: {this.props.price.toFixed(2)} </strong></p>
            <p> Continue to Checkout? </p>
            <Button 
                btnType='Danger'
                clicked={this.props.purchaseCancelled}> CANCEL </Button>
            <Button 
                btnType='Success'
                clicked={this.props.purchaseContinued}> CONTINUE </Button>
        </Aux>
        );
    }
};

export default OrderSummary;