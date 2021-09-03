import React, {Component} from 'react';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import TextInput from './components/TextInput';
import DropDown from './components/DropDown';
import TextArea from './components/TextArea';
import TimeInput from './components/TimeInput';
import firebase from './Firebase';
import { getDatabase, ref, set } from 'firebase/database';

class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {
            settings: {
                daysAvailable: [],
                timeAvailable: '',
                toppingsAvailable: [],
                cookTime: '',
                orderCount: ''
            },
            
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleToppings = this.handleToppings.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
            return {
                update : {
                    ...prevState.update, [name]: value
                }
            }
        });
    }

    handleToppings(e) {
        const newSelection = e.target.value;
        let newSelectionArray;

        // Change "toppings" to whatever checkbox area is called.
        if(this.state.update.toppings.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.update.toppings.filter(s => s !== newSelection)
        } else {
            newSelectionArray = [...this.state.update.toppings, newSelection];
        }

        this.setState( prevState => ({ update:
            {...prevState.update, toppings: newSelectionArray }
        })
        );
    }

    addOrder = update => {
        var timestamp = new Date().getTime();
        let orderID = `${this.state.update.phone}-${timestamp}`;
        var today = new Date().toLocaleDateString().replace(/\//g, '-');
        // console.log(today.toLocaleDateString("en-US"));
        // console.log(orderID);
        const db = getDatabase();
        set(ref(db, 'orders/' + today + '/' + orderID), update);
    };

    validateForm(e) {
        let pTime = this.state.update.pickUp;
        var hh = parseInt(pTime.slice(0, 2));
        var mm = parseInt(pTime.slice(3, 5));
        var timeNow = new Date();
        var oTime = new Date(timeNow.getTime() + (30*60000)).toLocaleTimeString('en-GB');
        var hhNow = parseInt(oTime.slice(0, 2));
        var mmNow = parseInt(oTime.slice(3, 5));
        // console.log(oTime);
        if (hh < 11 || (hh === 11 && mm < 30)) {
            // console.log("Time is too soon!");
            document.getElementById("timeError").innerHTML = "Too Early!"
        } else if (hh > 20 || (hh === 20 && mm > 30)) {
            // console.log("Too Late!");
            document.getElementById("timeError").innerHTML = "Too Late!"
        } else if (hh < hhNow || (hh === hhNow && mm < mmNow)) {
            document.getElementById("timeError").innerHTML = "Please allow at least 30 minutes for your pizza to be prepared."
        }else {
            // console.log("Looks good!")
            document.getElementById("timeError").innerHTML = ""
            this.addOrder(this.state.update);
            this.handleClearForm(e);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.validateForm(e);
        // this.addOrder(this.state.newOrder);
        // this.handleClearForm(e);    
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            update: {
                daysAvailable: [],
                timeAvailable: '',
                toppingsAvailable: [],
                cookTime: '',
                orderCount: ''
            }
        });
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <div className="row justify-content-center">
                    <div className="col-md-8 justify-content-center">
                        <div className="form-control form-label fs-4 text-center">
                            <div>12" deep dish pizza serves 4 - 6 people.</div>
                            <div>$25 per pizza with unlimited toppings.</div>
                        </div>
                        <div className="form-control">
                            <Checkbox title={'Toppings: '}
                                name={'toppingsAvailable'}
                                options={this.state.toppingsOptions}
                                selectedOptions = {this.state.update.toppingsAvailable}
                                handleChange={this.handleToppings}
                            />
                        </div>
                        <div className="form-control">
                        <span className="text-danger" id="timeError"></span>                
                        <TimeInput inputType={'time'}
                            name={'pickUp'}
                            title={'Select pick up time (please allow 30 minutes for your pizza to be made):  '}
                            value={this.state.newOrder.pickUp}
                            placeHolder={'Select Pick Up Time'}
                            handleChange={this.handleInput}
                            minTime={new Date().setHours(11, 30, 0, 0)}
                            maxTime={new Date().setHours(20, 30, 0, 0)}
                            required={'required'}
                        />
                        </div>
                        <div className="form-control">
                        <TextInput inputType={'text'}
                            name={'oName'}
                            title={'Name on order:  '}
                            value={this.state.newOrder.oName}
                            placeHolder={'First and Last Name'}
                            handleChange={this.handleInput}
                            required={'required'}
                        />
                        </div>
                        <div className="form-control">
                        <TextInput inputType={'email'}
                            name={'email'}
                            title={'Email Address:  '}
                            value={this.state.newOrder.email}
                            placeHolder={'email@mail.com'}
                            handleChange={this.handleInput}
                            required={'required'}
                        />
                        </div>
                        <div className="form-control">
                        <TextInput inputType={'number'}
                            name={'phone'}
                            title={'Phone Number:'}
                            value={this.state.newOrder.phone}
                            placeHolder={'555-555-5555'}
                            handleChange={this.handleInput}
                            required={'required'}
                        />
                        </div>
                        <div className="form-control">
                            <Button 
                                action = {this.handleFormSubmit}
                                type = {'primary'}
                                title = {'Submit'}
                                className = {'btn btn-outline-primary me-2'}
                            />
                            <Button 
                                action = {this.handleClearForm}
                                type = {'secondary'}
                                title = {'Clear'}
                                className = {'btn btn-outline-danger'}
                            />
                        </div>
                    </div>
                    
                </div>
            </form>
        )
    }

}

export default Settings;