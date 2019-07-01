import React, { Component } from 'react';
import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';
import { Get, Post } from 'react-axios';
import { Spinner } from 'reactstrap';
import { error } from 'util';
import ProviderRooms from './ProviderRooms';

import styles from './Myrooms.module.css'


class Myrooms extends Component {
	constructor(props){
		super(props);
		// console.log("Sto Myrooms\n-------------------");
		// console.log(props);
		// console.log("UserInfo\n-------------------");
		// let userinfo = ;
		// console.log(userinfo["id"]);
	}

	render(){
		return(
				
			<Container className={styles['results-container']}>
				<Row>
					<Col sm={10}>
						<h2>My rooms</h2>
					</Col>
					<Col sm={2}>
						<Button className={styles['room-add-btn']} color="info" size="sm">Προσθήκη Δωματίου</Button>
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
							<ProviderRooms 
								key={room.id}
								price={room.price}
								capacity={room.capacity}
								wifi={room.wifi}
								pool={room.pool}
								shauna={room.shauna}
								roomName={room.roomName}
								description={room.description}
								location={room.location.cityname}
								maxOccupants={room.maxOccupants}
								ratings={room.rating}
								// details={room}
							/>
						);
						return myrooms;
					}
					return null;
				}}
				</Get>
			</Container>
			
		);
	}
}

export default Myrooms;