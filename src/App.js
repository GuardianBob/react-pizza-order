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
import SideDrawer from './components/SideDrawer'
import Context from "./Context";


class App extends Component {

  constructor() { // Constructor is a builder that defines what the component looks like
    super(); // Super is required to initialize a constructor
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
    // This fetches the cart
    let cart = localStorage.getItem("cart");
    // This fetches products when app is loaded
    // const products = await axios.get('http://localhost:3001/products');
    // user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};
    // this.setState({ user });    
    this.setState({ cart });
  }

  render (){
    
    return (
      <div>
        <Router>
          <Home path="/" />
          <Admin path="/admin" />
          <Login path="/login" />
          {/* <Orders path="/orders" />
          <OrdersToday path="/todays-orders" /> */}
        </Router>
      </div>
      
    );
  }
}

export default App;
