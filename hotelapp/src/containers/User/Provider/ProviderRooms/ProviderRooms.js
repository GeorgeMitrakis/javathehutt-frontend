import React, { Component } from 'react';
import { Container, Col, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Get, Post } from 'react-axios';
import { Spinner } from 'reactstrap';
import produce from 'immer';
import RoomForm from '../../../Room/RoomForm/RoomForm';
import Room from '../../../Room/Room';

import styles from './ProviderRooms.module.css'


class ProviderRooms extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			roomAdded:false
		};

		// this.addRoomToggle = this.addRoomToggle.bind(this);
		// this.deleteRoomToggle = this.deleteRoomToggle.bind(this);
		// this.mapToggle = this.mapToggle.bind(this);
	}

	addRoomToggle = () => {
		this.setState(prevState => ({
            addRoomModal: !prevState.addRoomModal
        }));
	}

	// handleCheckBoxChange = (label) => {
    //     console.log("[FiltersTab.js]");
    //     console.log("Allakse kati se checkbox sto " + label);
    //     facilities[label] = !facilities[label];
    //     console.log(facilities);
    // }
	
	roomsChangedHandler = () => {		
		this.setState(
			produce( draft => {
				draft.roomAdded = !this.state.roomAdded;
			})
		)
	}

	render(){

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
                                <Room 
                                    key={room.id}
                                    renderProvFuncs={true}
									room={room} 
									editHandler={(event) => this.editRoomToggle(event, room)} 
									deleteHandler = {(event) => this.deleteRoomToggle(event, room)}
								/>
								// <SearchResult 
								// 	details={room} 
								// 	editHandler={(event) => this.editRoomToggle(event, room)} 
								// 	deleteHandler = {(event) => this.deleteRoomToggle(event, room)}
								// />
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
						<RoomForm/>
						{/* <Form onSubmit={this.submitForm}>
							{formFields}
							<FormGroup row>
							<Label for="extras" sm={2}>Παροχές</Label>
							<Container>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('breakfast')}>
									Πρωινό
								</Checkbox>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('wifi')}>
									Wi-Fi
								</Checkbox>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('shauna')}>
									Σάουνα
								</Checkbox>
								<Checkbox  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('pool')}>
									Πισίνα
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
						</Form> */}
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

export default ProviderRooms;