import React, { Component } from 'react';
import produce from 'immer';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText} from 'reactstrap';
import classes from './Checkout.module.css';


class Checkout extends Component{

    constructor(props){
        super(props);
        this.state={
            room: {
                name: null,
                price: null
            },
            card: {
                id: null,
                expires: null,
                three_digits: null,
                type: null
            }
        };
    }

    render(){
        return(
            <div id={classes.content}>
                <Row className="justify-content-center mt-5">
                    <h1 className="font-weight-bold" >GIVE ME YO MONEY !!!!</h1>
                </Row>

                <Row className="d-flex justify-content-center">
                    <Col className="d-flex justify-content-around">
                        <h2>Room Title:</h2>
                        <h2>Title 1</h2>
                    </Col>
                    <Col className="d-flex justify-content-around">
                        <h2>Room Price</h2>
                        <h2>Too Much</h2>
                    </Col>
                </Row>

                <Form>
                    <FormGroup col >
                        <Row className="d-flex justify-content-around">
                            <InputGroup>
                                <h2>Card id:</h2>
                                <Input
                                    type="text"
                                    placeholder="1111-2222-3333-4444"
                                />

                                <h2>Card 3-digits:</h2>
                                <Input
                                    type="text"
                                    placeholder="123"
                                />
                            </InputGroup>
                        </Row>

                    </FormGroup>
                </Form>
            </div>
            
        );
    }


}

export default Checkout;