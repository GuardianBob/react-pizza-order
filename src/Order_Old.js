import React, { Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';
import FormContainer from './components/FormContainer'
import SideDrawer from './components/SideDrawer'
import DrawerToggle from './components/DrawerToggle'
import BackDrop from './components/BackDrop'

const TOPPINGS = ["Pepperoni", "Italian Sausage", "Roasted Red Peppers", "Onion", "Green Bell Pepper", "Bacon", "Garlic", "Spinach", "Black Olives"];

class Order extends Component {    

    constructor(props) {
        super(props);
        this.state = props
        // console.log(props.sideDrawerOpen);
        // this.state = {
        //     sideDrawerOpen: false
        // };
        
        this.drawerClickHandler = this.drawerClickHandler.bind(this);
        // console.log(this.state);
    }

    drawerClickHandler = () => {
        this.setState({
            sideDrawerOpen: !this.state.sideDrawerOpen
        })
        // console.log(this.state.sideDrawerOpen)
    }

    backgroundClickHandler = () => {
        if (this.state.sideDrawerOpen){
            this.setState({
                sideDrawerOpen: false, 
            })
        }
        
        // console.log(this.state.sideDrawerOpen)
    }

    render() {
        const {user} = this.props;

        let backdrop;
        if(this.state.sideDrawerOpen){
            backdrop = <BackDrop  click={this.backgroundClickHandler}/>;
        }

        return (
            <div>
                <FormContainer cartOrders={this.state.cartOrders}/>
            </div>
        )
    }
}

export default Order;