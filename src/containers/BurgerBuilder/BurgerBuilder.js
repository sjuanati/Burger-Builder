import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,      // To show/hide modal
    }

    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredients();
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
        return sum > 0;
    }

    // This won't work because only arrow functions capture the state values
    // purchaseHandler () {
    //     this.setState({purchasing: true})
    // }

    purchaseHandler = () => {
        if (this.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        }
        
    }

    purchasedCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            // disable if value is <= 0
            disabledInfo[key] = disabledInfo[key] <= 0
        } // structure will be something like:  {salad: true, meat: false ...}

        let orderSummary = null; 
        let burger = this.props.error ? <p> Ingredients can't be loaded :( </p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price} 
                purchaseCancelled={this.purchasedCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));