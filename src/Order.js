import React, { Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';
import FormContainer from './components/FormContainer'

const TOPPINGS = ["Pepperoni", "Italian Sausage", "Roasted Red Peppers", "Onion", "Green Bell Pepper", "Bacon", "Garlic", "Spinach", "Black Olives"];

class Order extends Component {    

    constructor(props) {
        super(props);
        

    }

    render() {
        const {user} = this.props;

        return (
            <div>
                <FormContainer />
            </div>
        )
    }
}

export default Order;