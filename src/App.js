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

class App extends Component {

  constructor() { // Constructor is a builder that defines what the component looks like
    super(); // Super is required to initialize a constructor
    this.state = {
      user: null,
    };
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
