import React, { Component } from 'react';
import {FaPizzaSlice} from 'react-icons/fa';
import {Link} from '@reach/router'
import FormError from './FormError';
import firebase from './Firebase';
import Order from './Order';

class Home extends Component {
    render() {
        const {user} = this.props;

        const pStyle = { color: "orange"}

        return (
            <div>
                <div className="container" id="home-title">
                    <div className="row text-center">
                        <div className="col-md-12 my-4">
                            <span className="align-middle me-2">
                                <FaPizzaSlice size={25} style={pStyle}/> 
                            </span>
                            <span className="align-middle display-4 text-primary">
                                Meyer Family Pizza - Daybreak
                            </span>                        
                        </div>
                        <hr></hr>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-md-8 mb-3">
                            <span className="text-center">
                                Deep dish pizza prepared traditionally by your neighbors on West Upland View Dr, South Jordan, Utah. 
                            </span>                        
                        </div>
                        <hr></hr>
                    </div>                
                </div>
                <div className="container" id="order-form">
                    <Order />
                </div>
            </div>
            );
    }
}

export default Home;