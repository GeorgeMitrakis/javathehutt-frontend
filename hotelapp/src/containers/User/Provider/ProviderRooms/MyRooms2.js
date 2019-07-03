import React, { Component } from 'react';
import { UncontrolledCarousel, Container, Col, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';
import { Get, Post } from 'react-axios';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { error } from 'util';
import { createQueryParams} from '../../../../Utility/Utility';
import ProviderRooms from './ProviderRooms';
import GoogleMapReact from 'google-map-react';
import { Checkbox } from 'pretty-checkbox-react';
import produce from 'immer';
import qs from "querystring";

import styles from './Myrooms.module.css'


const facilities = {
   
	breakfast: false,
	wifi: false,
	pool: false,
	shauna: false
}

const coords = {
	cordX: "",
	cordY: ""
}

class Myrooms extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			roomAdded:false,

			formControls: {
				roomName: {
					rules: {
						required: true
					},
					id: "roomName",
					name: "Όνομα",
					value: "",
					type: "text",
					placeholder: "Όνομα Δωματιου",
				},
				price: {
					rules: {
						required: true
					},
					id: "price",
					name: "Τιμή",
					value: "",
					type: "number",
					placeholder: "150€",
				},
				capacity: {
					rules: {
						required: true
					},
					id: "capacity",
					name: "Δωμάτια",
					value: "",
					type: "number",
					placeholder: "1",
				},
				maxOccupants: {
					rules: {
						required: true
					},
					id: "maxOccupants",
					name: "Κλίνες",
					value: "",
					type: "number",
					placeholder: "2",
				},
				cityName: {
					rules: {
						required: true
					},
					id: "roomName",
					name: "Πόλη",
					value: "",
					type: "text",
					placeholder: "Athens",
				},
				description: {

					id: "descr",
					name: "Περιγραφή Δωματίου",
					value: "",
					type: "textarea",
					placeholder: "Προσθέστε κάτι σχετικό με το δωμάτιο",
				}
			},
			addRoomModal: false,
			mapModal: false,
			removeRoomModal: false,
			editRoomModal: false,
			deletedRoom: ""
		};

		this.addRoomToggle = this.addRoomToggle.bind(this);
		this.deleteRoomToggle = this.deleteRoomToggle.bind(this);
		this.mapToggle = this.mapToggle.bind(this);
	}

	addRoomToggle = () => {
		this.setState(prevState => ({
            addRoomModal: !prevState.addRoomModal
        }));
	}

	deleteRoomToggle = (event, room) => {
		if(room){
			this.setState(prevState => ({
				removeRoomModal: !prevState.removeRoomModal,
				deletedRoom: room
			}));
		}
		else{
			this.setState(prevState => ({
				removeRoomModal: !prevState.removeRoomModal,
				deletedRoom: ""
			}));
		}
	}

	editRoomToggle = (event, room) =>{
		if(room){

			this.setState(prevState => ({
				editRoomModal: !prevState.editRoomModal,
				deletedRoom: room
			}));

			for(let key in facilities){
				facilities[key] = room[key];
			}

			for(let key in coords){
				coords[key] = room.location[key];
			}
		}
		else{
			this.setState(prevState => ({
				editRoomModal: !prevState.editRoomModal,
				deletedRoom: ""
			}));
		}

		
	}

	mapToggle = () => {
        this.setState(prevState => ({
            mapModal: !prevState.mapModal
        }));
	}
	
	mapClickedHandler = (mapProps, map, e) => {
		this.mapToggle();
		console.log(mapProps);
		coords['cordX'] = mapProps.lat;
		coords['cordY'] = mapProps.lng;
	}

	handleCheckBoxChange = (label) => {
        console.log("[FiltersTab.js]");
        console.log("Allakse kati se checkbox sto " + label);
        facilities[label] = !facilities[label];
        console.log(facilities);
    }
	
	submitForm = (event) => {
		event.preventDefault();
		
		let formData = {};
		formData['providerId'] = JSON.parse(localStorage.getItem('userInfo'))["id"];
		for ( let key in this.state.formControls ) {
            formData[key] = this.state.formControls[key].value;
		}
		
		for(let key in facilities){
			formData[key] = facilities[key];
		}

		
		for(let key in coords){
			formData[key] = coords[key];
		}

		console.log("---Form Data---");
		console.log(formData);
		console.log(facilities); 
		console.log(coords);    
        console.log("---------------");
		
		axios.post(
            "http://localhost:8765/app/api/rooms",
            qs.stringify(formData),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            console.log(result);
            if (!result.data.success)
            {
                alert(result.data.message);
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
	
	inputChangedHandler= (event, controlName) => {
		const value = event.target.value;
		this.setState( 
            produce(draft => { 
                draft.formControls[controlName].value = value; 
            }) 
        ); 
	}

	editRoomHandler = () => {

		let formData = {};
		// formData['providerId'] = JSON.parse(localStorage.getItem('userInfo'))["id"];
		formData['roomId'] = this.state.deletedRoom['id'];
		for ( let key in this.state.formControls ) {
            formData[key] = this.state.formControls[key].value;
		}
		
		for(let key in facilities){
			formData[key] = facilities[key];
		}

		for(let key in coords){
			formData[key] = coords[key];
		}

		console.log("---Form Data---");
		console.log(formData);
		console.log(facilities); 
		console.log(coords);    
		console.log("---------------");
		formData['breakfast'] = true
		axios.put(
            "http://localhost:8765/app/api/rooms",
            qs.stringify(formData),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            console.log(result);
            if (!result.data.success)
            {
                alert(result.data.message);
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
		
		// alert("Kanw edit");
	}

	deleteRoomHandler = () => {
		console.log("------------------");
		console.log("Delete Handler --> id = "+ this.state.deletedRoom.id);
		console.log("------------------");
		
		let params = {};
		params['roomId'] = this.state.deletedRoom.id;
		const queryParams = createQueryParams(params);
		// this.props.history.push("/searchresults?" +  JSON.parse(localStorage.getItem('userInfo'))["id"]);
		console.log(queryParams);
		axios.delete("http://localhost:8765/app/api/rooms?"+queryParams)
        .then((result) => {
            console.log(result);
            if (!result.data.success)
            {
                alert(result.data.message);
            }
            else
            {        
                alert("Επιτυχής Διαγραφή!");
                this.props.history.replace("/");
            }
        })
        .catch((err) => {
            console.log(err);
        })
	}

	render(){
		const formElementsArray = [];
        for ( let key in this.state.formControls ) {
			let obj = this.state.formControls[key]
			if(this.state.deletedRoom){
				if(key === 'cityName'){
					obj['value'] = this.state.deletedRoom.location['cityname']
				}
				else{
					obj['value'] = this.state.deletedRoom[key]
				}
			}
            formElementsArray.push( {
                id: key,
                config: obj
            });
		}

		console.log(formElementsArray)
		console.log("-------------")
		console.log((this.state.deletedRoom))

		let formFields = formElementsArray.map( formElement => (
			<FormGroup row>
			<Label for={formElement.config.id} sm={2}>{formElement.config.name}</Label>
			<Col sm={10}>
				<Input 
				key={formElement.id}
                id={formElement.config.id}
                name={formElement.config.name}
				onChange={( event ) => this.inputChangedHandler( event, formElement.id )}
                type={formElement.config.type}
				value={formElement.config.value}
                placeholder={formElement.config.placeholder}
                />
			</Col>
			</FormGroup>
        ));
		
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
								<ProviderRooms details={room} editHandler={(event) => this.editRoomToggle(event, room)} deleteHandler = {(event) => this.deleteRoomToggle(event, room)}/>
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
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.submitForm}>Προσθήκη</Button>
						<Button color="secondary" onClick={this.addRoomToggle}>Ακύρωση</Button>
					</ModalFooter>
				</Modal>
				<Modal isOpen={this.state.removeRoomModal} toggle={this.deleteRoomToggle} className="modal-lg">
					<ModalHeader> Διαγραφή Δωματίου</ModalHeader>
					<ModalBody>
						Είστε σίγουροι πως επιθύμειτε τη διαγραφή του δωματίου: {this.state.deletedRoom.roomName}? 
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.deleteRoomHandler}>Διαγραφή</Button>
						<Button color="secondary" onClick={this.deleteRoomToggle}>Ακύρωση</Button>
					</ModalFooter>
				</Modal>
				<Modal isOpen={this.state.editRoomModal} toggle={this.editRoomToggle} className="modal-lg">
				<ModalHeader toggle={this.editRoomToggle}>Επεξεργασία Δωματίου {this.state.deletedRoom.roomName}</ModalHeader>
				<ModalBody>
						<Form onSubmit={this.submitForm}>
							{formFields}
							<FormGroup row>
							<Label for="extras" sm={2}>Παροχές</Label>
							<Container>
								<Checkbox checked={facilities['breakfast']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('breakfast')}>
									Πρωινό
								</Checkbox>
								<Checkbox checked={facilities['wifi']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('wifi')}>
									Wi-Fi
								</Checkbox>
								<Checkbox checked={facilities['shauna']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('shauna')}>
									Σάουνα
								</Checkbox>
								<Checkbox checked={facilities['pool']}  className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('pool')}>
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
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.editRoomHandler}>Τέλος Επεξεργασίας</Button>
						<Button color="secondary" onClick={this.editRoomToggle}>Ακύρωση</Button>
					</ModalFooter>
				</Modal>
			</>
			
		);
	}
}

export default Myrooms;