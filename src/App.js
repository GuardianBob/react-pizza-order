import logo from './logo.svg';
import './App.css';
import firebase from './Firebase';
import React, { Component} from 'react';
import Home from './Home';
import Admin from './Admin';
import Login from './Login';
import Orders from './Orders';
import OrdersToday from './OrdersToday';
import { Router, navigate } from '@reach/router';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import SideDrawer from './components/SideDrawer'
import Context from "./Context";


class App extends Component {

  constructor(props) { // Constructor is a builder that defines what the component looks like
    super(props); // Super is required to initialize a constructor
    this.state = {
      user: null,
      cart: {}, 
      toppings: []
    };

    this.routerRef = React.createRef();
  }  

  async componentDidMount() {
    // This loads the user when the application is started
    // let user = localStorage.getItem("user");
    let settings = {};
    const db = getDatabase();
    const settingsRef = ref(db, 'settings/');
    onValue(settingsRef, (snapshot) => {
        // this.state.toppingsOptions = snapshot.val();
        settings = snapshot.val();
        this.state.settings = settings;
        this.state.toppingsOptions = settings['toppingsAvailable'];
        // console.log(this.state.toppingsOptions);
        var d = new Date();
        var dN = d.getDay();
        // console.log(dN + ": " + settings['daysAvailable']);
        if (settings['daysAvailable'].includes(dN)) {
            this.state.available = true;
        } else {
            this.state.available = false;
        }
        // console.log(this.state.available);
        
        this.forceUpdate()
    })
    // This fetches the cart
    let cart = localStorage.getItem("cart");
    // This fetches products when app is loaded
    // const products = await axios.get('http://localhost:3001/products');
    // user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};
    // this.setState({ user });    
    this.setState({ cart });
  }

  addToCart = cartItem => {
    let cart = this.state.cart;
    // Check if item already exists in cart and increase the amount
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    // Validates number of items added to cart against available inventory
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    // Saves cart items to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  render (){
    
    return (
      
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          // login: this.login,
          // addProduct: this.addProduct,
          clearCart: this.clearCart,
          // checkout: this.checkout
        }}
      >
        <div>
          <Router>
            <Home path="/" />
            <Admin path="/admin" />
            <Login path="/login" />
            {/* <Orders path="/orders" />
            <OrdersToday path="/todays-orders" /> */}
          </Router>
          
        </div>
      </Context.Provider>
    );
  }
}

export default App;
