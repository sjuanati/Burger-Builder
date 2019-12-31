import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // prevent to send the request and reload the page
        event.preventDefault();
        
        // In Production, price should be calculated on the server side, to make sure the user
        // is not manipulating the price. Product prices should also be on the server side.
        this.setState({ loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Marc Molins',
                address: {
                    street: 'Teststreet 15',
                    zipCode: '12345',
                    country: 'Catalonia'
                },
                email: 'test@test.cat'
            },
            deliveryMethod: 'fastest'
        }
        // Firebase expects json data
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render () {
        let form = (
            <form>
            <input className={styles.Input} type='text' name='name' placeholder='Your Name' />
            <input className={styles.Input} type='email' name='email' placeholder='Your Email' />
            <input className={styles.Input} type='text' name='street' placeholder='Street' />
            <input className={styles.Input} type='text' name='postal' placeholder='Postal Code' />
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;