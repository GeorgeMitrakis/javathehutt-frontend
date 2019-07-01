import React from 'react';

import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';

import styles from './ProviderRooms.module.css';
import RoomInfo from '../../../RoomInfo/Roominfo';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

const providerRoom = (props) => {

    return (
        <Row>
            <Container fluid className={styles['res-container'] }>
                <Row className="justify-content-center">
					<Col xs="8" sm="8" md="10" lg="10">
                        <h2>{props.details.roomName}</h2>
					</Col>
					<Col xs="2" sm="" md="1" lg="1">
						<Button className={styles['room-remove-btn']} color="danger" size="sm">
                        <FontAwesomeIcon  icon={faTrash}  />
                        </Button>
					</Col>
                    <Col xs="2" sm="2" md="1" lg="1">
						<Button className={styles['room-edit-btn']} color="info" size="sm">
                        <FontAwesomeIcon  icon={faEdit}  />
                        </Button>
					</Col>
				</Row>

                <Row className={styles['row-style']}>
                    <Col xs={6}>
                        <p>Περιοχή: {props.details.location.cityname}</p>
                    </Col>
                    
                </Row>
                <Row className={styles['row-style']}>
                    <Col xs={6}>
                        <p>Διαθεσιμότητα: {props.details.maxOccupants}</p>
                    </Col>
                    <Col xs={6}>
                        <p className={styles['price-par']}>Τιμή: {props.details.price}</p>
                    </Col>
                </Row>
                <RoomInfo/>
            </Container>
        </Row>
    );
    
}

export default providerRoom;