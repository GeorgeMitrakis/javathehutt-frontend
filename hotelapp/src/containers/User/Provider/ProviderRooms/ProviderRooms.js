import React from 'react';

import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';

import styles from './ProviderRooms.module.css';
import RoomInfo from '../../../RoomInfo/Roominfo';
import Header from '../../../../components/UI/Header/Header'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faMapMarkerAlt, faEuroSign } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

const providerRoom = (props) => {

    return (
        <Row>
            <Container fluid className={styles['res-container'] }>
                <Row className="justify-content-center">
					<Col xs="6" sm="6" md="10" lg="10">
                        <Header classes="d-flex flex-shrink-1 border">
                            {props.details.roomName}
                        </Header>
					</Col>
					<Col xs="6" sm="6" md="2" lg="2" className={styles['btn-col']}>
						<Button className={styles['room-remove-btn']} color="danger" size="sm" onClick = {props.deleteHandler}>
                            <FontAwesomeIcon  icon={faTrash}  />
                        </Button>
                        <Button className={styles['room-edit-btn']} color="info" size="sm" onClick = {props.editHandler}>
                            <FontAwesomeIcon  icon={faEdit}  />
                        </Button>
					</Col>
                    {/* <Col xs="3" sm="3" md="1" lg="1" className={styles['btn-col']}> */}
						
					{/* </Col> */}
				</Row>

                <Row className={styles['row-style']}>
                    {/* <div className="text-muted small"> 
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {props.details.location.cityname}
                    </div> */}
                    <Col xs={6}>
                        <FontAwesomeIcon  icon={faMapMarkerAlt}  />
                        {props.details.location.cityname}
                        {/* <p>Περιοχή: {props.details.location.cityname}</p> */}
                    </Col>
                    
                </Row>
                <Row className={styles['row-style']}>
                    <Col xs={6}>
                        <p>Διαθεσιμότητα: {props.details.capacity}</p>
                    </Col>
                    {/* <Col xs={6}>
                        <p className={styles['price-par']}>Τιμή: {props.details.price}</p>
                    </Col> */}
                </Row>
                <Row>
                <Col xs={6}>
                    <p className={styles['price-par']}>Τιμή: {props.details.price}</p>
                    <FontAwesomeIcon  icon={faEuroSign}  />
                </Col>
                <Col xs={6}><RoomInfo/></Col>
                </Row>
 
            </Container>
        </Row>
    );
    
}

export default providerRoom;