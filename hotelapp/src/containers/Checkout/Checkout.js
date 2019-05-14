import React, { Component } from 'react';
import produce from 'immer';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Row, Col, Form, FormGroup,
    Input, InputGroup, InputGroupText, 
    InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import classes from './Checkout.module.css';
import axios from 'axios';
import { createQueryParams, getQueryParams, getUserInfoField } from '../../Utility/Utility';
import qs from "querystring";


class Checkout extends Component{

    constructor(props){
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state={
            dropdownOpen: false,
            room: {
                name: null,
                price: null
            },
            card: {
                id: null,
                expdate: null,
                csc: null,
                type: "Visa"
            }
        };
    }

    toggleDropDown() {
        this.setState(
            produce(draft => {
                draft.dropdownOpen = !this.state.dropdownOpen;
            })
        );
    }

    handleCardId(event){
        let id=event.target.value;
        this.setState(
            produce(draft => {
                draft.card.id = id;
            })
        );
    }

    handleCSC(event){
        let csc=event.target.value;
        this.setState(
            produce(draft => {
                draft.card.csc = csc;
            })
        );
    }

    handleCardExpdate(event){
        let expdate=event.target.value;
        this.setState(
            produce(draft => {
                draft.card.expdate = expdate;
            })
        );
    }

    handleCardType(type){
        this.setState(
            produce(draft => {
                draft.card.type = type;
            })
        );
    }


    //the method below returns the current date in form "YYYY-MM-DD"
    todayIs(){
        let initialdate = new Date();
        let fulldate = "";
        fulldate  = fulldate  + initialdate.getFullYear() +"-";
        if(initialdate.getMonth()+1<10)
            fulldate  = fulldate  + "0";
        fulldate  = fulldate  +  (initialdate.getMonth()+1) +"-";
        if(initialdate.getDate()<10)
            fulldate  = fulldate  + "0";
        fulldate  = fulldate  +  initialdate.getDate();

        return fulldate;
    }

    

    submitForm = (event, bookingInfo) => {
        event.preventDefault();
        console.log(this.state);
        console.log(bookingInfo);

        let formData = {};
        formData["roomId"] = bookingInfo.id;
        formData["startDate"] = bookingInfo.fromDate;
        formData["endDate"] = bookingInfo.toDate;
        formData["userId"] = getUserInfoField("id");

        console.log("form data: ");;
        console.log(formData);
        console.log("---------------");
        
        axios.post(
            "http://localhost:8765/app/api/book",
            qs.stringify(formData),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            console.log(result);
            if (!result.data.success)
            {
                alert("PAIXTHKE TROLLIA");
            }
            else
            {        
                alert("Επιτυχής Κράτηση!");
                this.props.history.replace("/");
            }
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    render(){

        const bookingInfo = getQueryParams(this.props.location.search);
        console.log("[Checkout.js] Rendering. Received query params: ");
        console.log(bookingInfo);
        console.log("---------");;

        return(
            <div id={classes.content}>
                {/* <Row className="justify-content-center mt-5">
                    <h1 className="font-weight-bold" >GIVE ME YO MONEY !!!!</h1>
                </Row> */}

                <Row className="d-flex justify-content-center">
                    <Col >
                        Room Title: Undefined
                    </Col>
                    <Col >
                        Room Price: Too Much
                    </Col>
                </Row>

                <Form onSubmit={(event) => this.submitForm(event, bookingInfo)}>
                    <FormGroup >
                        <Row className="mt-3 mb-3">
                            <Col>
                                <InputGroup>
                                    <InputGroupText>Card id:</InputGroupText>
                                    <Input
                                        type="text"
                                        placeholder="1111222233334444"
                                        onChange={this.handleCardId.bind(this)}
                                    />
                                </InputGroup>
                            </Col>

                            <Col>
                                <InputGroup>
                                    <InputGroupText>Card Security Code:</InputGroupText>
                                        <Input
                                            type="text"
                                            placeholder="123"
                                            onChange={this.handleCSC.bind(this)}
                                        />
                                </InputGroup>
                            </Col>
                        </Row>
                        

                        <Row  className="mt-3 mb-3">
                            <Col>
                                <InputGroup>
                                    <InputGroupText>Expiration date:</InputGroupText>
                                        <Input
                                            type="date"
                                            min={this.todayIs()}
                                            onChange={this.handleCardExpdate.bind(this)}
                                        />
                                </InputGroup>
                            </Col>

                            <Col>
                                <InputGroupButtonDropdown 
                                    addonType="append"  
                                    isOpen={this.state.dropdownOpen} 
                                    toggle={this.toggleDropDown}>

                                    <DropdownToggle caret >
                                        Card Type:
                                    </DropdownToggle>
                                    <DropdownMenu className="p-2">
                                        <DropdownItem 
                                            className="d-flex align-items-center"
                                            onClick={this.handleCardType.bind(this,'Visa')}>

                                            Visa
                                        </DropdownItem>

                                        <DropdownItem divider />

                                        <DropdownItem 
                                            className="d-flex align-items-center"
                                            onClick={this.handleCardType.bind(this,'Mastercard')}>

                                            Mastercard
                                        </DropdownItem>
                                        
                                        <DropdownItem divider />
                                        <DropdownItem 
                                            className="d-flex align-items-center" 
                                            onClick={this.handleCardType.bind(this,'Diners')}>

                                            Diners
                                        </DropdownItem>
                                    </DropdownMenu>
                                    <Input readOnly
                                        type="text"
                                        value={this.state.card.type}
                                    />
                                </InputGroupButtonDropdown>                                
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-end">
                                <SubmitBtn classes="form-control rounded-0" borderWidth="2px">
                                    Κράτηση
                                </SubmitBtn>
                        </Row>


                    </FormGroup>
                </Form>
            </div>
            
        );
    }


}

export default withRouter(Checkout);