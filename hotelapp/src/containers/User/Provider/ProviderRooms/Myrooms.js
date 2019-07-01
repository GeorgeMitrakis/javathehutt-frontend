import React, { Component } from 'react';
import { UncontrolledCarousel, Container, Col, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';
import { Get, Post } from 'react-axios';
import { Spinner } from 'reactstrap';
import { error } from 'util';
import ProviderRooms from './ProviderRooms';
import GoogleMapReact from 'google-map-react';
import { Checkbox } from 'pretty-checkbox-react';

import styles from './Myrooms.module.css'


const facilities = {
   
	breakfast: false,
	wifi: false,
	pool: false,
	sauna: false
}

class Myrooms extends Component {
	constructor(props){
		super(props);
		// console.log("Sto Myrooms\n-------------------");
		// console.log(props);
		// console.log("UserInfo\n-------------------");
		// let userinfo = ;
		// console.log(userinfo["id"]);
		this.state = {
			addRoomModal: false,
			mapModal: false
			// removeRoomModal: false
		};

		this.addRoomToggle = this.addRoomToggle.bind(this);
		this.mapToggle = this.mapToggle.bind(this);
	}

	addRoomToggle = () => {
		this.setState(prevState => ({
            addRoomModal: !prevState.addRoomModal
        }));
	}

	mapToggle = () => {
        this.setState(prevState => ({
            mapModal: !prevState.mapModal
        }));
	}
	
	mapClickedHandler = () => {
        this.mapToggle();
	}
	
	submitForm = (event) => {
        event.preventDefault();
		console.log(this.state);
		// const data = new FormData(event.target);
    }

	render(){

		const googleMap =  (<GoogleMapReact
			onClick={this.mapClickedHandler}
			bootstrapURLKeys={{ key: "AIzaSyDzbz3N1cN0rLnP3WVa2lSkDWJ8uSIj2pA" }}
			defaultCenter={{
				lat: 53.430957,
				lng: -2.960476
			}}
			defaultZoom={11}
		>
		{/* <p> "My Marker" </p> */}
		</GoogleMapReact>
		);

		return(
			<>
				<Container className={styles['results-container']}>
					<Row className={styles['top-row']}>
						<Col xs="8" sm="8" md="10" lg="10">
							<h3 className={styles['title']}>My rooms</h3>
						</Col>
						<Col xs="4" sm="4" md="2" lg="2">
							<Button className={styles['room-add-btn']} color="info" size="sm" onClick={this.addRoomToggle}>Προσθήκη Δωματίου</Button>
						</Col>
					</Row>
					
					<Get url="http://localhost:8765/app/api/rooms" params={{
						providerId: JSON.parse(localStorage.getItem('userInfo'))["id"]}}>
					{(error, response, isLoading, makeRequest, axios) => {
						if (error) {
							return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
						}
						else if (isLoading) {
							return (<Spinner className="ml-5" color="primary" style={{ width: '3rem', height: '3rem' }} />);
						}
						else if (response !== null) {
							console.log("Sto Myrooms to response2\n-------------------");
							console.log(response);
							const myrooms = response.data.data.rooms.map(room =>
								<ProviderRooms details={room}/>
							);
							return myrooms;
						}
						return null;
					}}
					</Get>
					
				</Container>
				<Modal isOpen={this.state.addRoomModal} toggle={this.addRoomToggle} className="modal-lg">
					<ModalHeader toggle={this.addRoomToggle}>Προσθήκη Δωματίου</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.submitForm}>
							<FormGroup row>
							<Label for="name" sm={2}>Όνομα</Label>
							<Col sm={10}>
								<Input type="text" name="email" id="name" placeholder="Όνομα δωματίου" required />
							</Col>
							</FormGroup>
							<FormGroup row>
							<Label for="price" sm={2}>Τιμή</Label>
							<Col sm={10}>
								<Input type="number" name="number" id="price" placeholder="150" required />
							</Col>
							</FormGroup>
							<FormGroup row>
							<Label for="capacity" sm={2}>Χωρητικότητα</Label>
							<Col sm={10}>
								<Input type="number" name="number" id="capacity" placeholder="2" required />
							</Col>
							</FormGroup>
							<FormGroup row>
							<Label for="name" sm={2}>Πόλη</Label>
							<Col sm={10}>
								<Input type="text" name="city" id="name" placeholder="Athens" required/>
							</Col>
							</FormGroup>
							<FormGroup row>
							<Label for="extras" sm={2}>Παροχές</Label>
							<Container>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" >
									Πρωινό
								</Checkbox>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" >
									Wi-Fi
								</Checkbox>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth">
									Σάουνα
								</Checkbox>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" >
									Πίσίνα
								</Checkbox>
							</Container>
							</FormGroup>
							<FormGroup row>
							<Label for="map" sm={2}>Τοποθεσία στο Χάρτη</Label>
							<Col sm={10}>
								{googleMap}
								<Modal className="modal-lg" centered fade isOpen={this.state.mapModal} toggle={this.mapToggle} >
									<div className={styles.box_border} style={{height: "75vh"}}>
										{googleMap}
									</div>
								</Modal>
								<FormText color="muted">
								Επιλέξτε σημείο στο χάρτη, τοποθετώντας το στίγμα στο σημείο που επιθυμείτε 
								</FormText>
							</Col>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.submitForm}>Προσθήκη</Button>
						<Button color="secondary" onClick={this.addRoomToggle}>Ακύρωση</Button>
					</ModalFooter>
				</Modal>
			</>
			
		);
	}
}

export default Myrooms;