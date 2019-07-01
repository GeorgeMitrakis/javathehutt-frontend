import React from 'react';

import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';

import styles from './ProviderRooms.module.css';
import RoomInfo from '../../../RoomInfo/Roominfo';


const providerRoom = (props) => {

    return (
        <Row>
            <Container fluid className={styles['res-container'] }>

                <Row>
					<Col sm={10}>
                        <h2>{props.roomName}</h2>
					</Col>
					<Col sm={2}>
						<Button className={styles['room-remove-btn']} color="danger" size="sm">Διαγραφή</Button>
					</Col>
				</Row>

                <Row className={styles['row-style']}>
                    <Col sm={6}>
                        <p>Περιοχή: {props.location}</p>
                    </Col>
                    <Col sm={6}>
                        <p className={styles['price-par']}>Τιμή: {props.price}</p>
                    </Col>
                </Row>
                <Row className={styles['row-style']}>
                    <Col sm={6}>
                        <p>Διαθεσιμότητα: {props.maxOccupants}</p>
                    </Col>
                </Row>
                <RoomInfo/>
            </Container>
        </Row>
    );
    
}

export default providerRoom;