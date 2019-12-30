import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,   // base price
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {

        // Insted of this, better to send 'ingredients' as parameter to get the latest version
        // Otherwise, it is only updated when a second ingredient is added.
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        // Create an array of string entries (salad, meat..) returning the amounts for each key
        const sum = Object.keys(ingredients)
        .map(ingKey => {
            return ingredients[ingKey]
        })
        // Sum of all ingredients
        .reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {

        // Ingredients addition
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;

        // Price calculation
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {

        // Ingredients removal
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) { return; }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;

        // Price calculation
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    // This won't work because only arrow functions capture the state values
    // purchaseHandler () {
    //     this.setState({purchasing: true})
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchasedCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            // disable if value is <= 0
            disabledInfo[key] = disabledInfo[key] <= 0
        } // structure will be something like:  {salad: true, meat: false ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}> 
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} 
                        purchaseCancelled={this.purchasedCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;