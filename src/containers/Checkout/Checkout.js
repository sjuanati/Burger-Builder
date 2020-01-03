import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    // Transfer ingredients from BurgerBuilder to CheckoutSummary
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
            // ['salad', '1']
            ingredients[param[0]] = +param[1];   //+param[1] : converts it to number
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} 
                    // component={ContactData}/>
                    // render in order to pass the ingredients
                    render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props}
                        />
                    )} />
            </div>
        );
    }
}

export default Checkout;
