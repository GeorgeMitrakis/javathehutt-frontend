import React from 'react';

import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';


import styles from './Result.module.css';
import Pills from './ResultPills';


const searchResult = (props) => {


    return (
        <Row>
            <Container className={styles['res-container']}>
                <h2>{props.details.name}</h2>
                <Row className={styles['row-style']}>
                    <Col sm={6}>
                        <p>Περιοχή: {props.details.location}</p>
                    </Col>
                    <Col sm={6}>
                        <p className={styles['price-par']}>Τιμή: {props.details.price}</p>
                    </Col>
                </Row>
                <Row className={styles['row-style']}>
                    <Col sm={6}>
                        <p>Διαθεσιμότητα: {props.details.capacity}</p>
                    </Col>
                    <Col sm={6}>
                        <Button onClick={props.bookRoomHandler} className={styles['reservation-btn']} color="primary">Κράτηση</Button>
                    </Col>
                </Row>
                <Pills/>
            </Container>
        </Row>
    );

    
}



export default searchResult;