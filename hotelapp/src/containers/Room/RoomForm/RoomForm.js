import React, { Component } from 'react';
import { Container, Col,  Modal, Form, FormGroup, Label, Input, FormText, Row, Button } from 'reactstrap';

import GoogleMapReact from 'google-map-react';
import { Checkbox } from 'pretty-checkbox-react';
import axios from 'axios';
import produce from 'immer';
import qs from "querystring";
import styles from './RoomForm.module.css'
import { getUserInfo} from '../../../Utility/Utility';

// const facilities = {
// 	breakfast:  false,
// 	wifi: false,
// 	pool: false,
// 	shauna: false
// }

// const coords = {
// 	cordX: "",
// 	cordY: ""
// }

class RoomForm extends Component{
    constructor(props){
        super(props)
        console.log("state" + this.props.room)
        this.state = {
            formControls: {
                roomName: {
                    rules: {
                        required: true
                    },
                    id: "roomName",
                    name: "Όνομα",
                    value: this.props.room ? this.props.room['roomName'] : "",
                    type: "text",
                    placeholder: "Όνομα Δωματιου",
                },
                price: {
                    rules: {
                        required: true
                    },
                    id: "price",
                    name: "Τιμή",
                    value: this.props.room ? this.props.room['price'] : "",
                    type: "number",
                    placeholder: "150€",
                },
                capacity: {
                    rules: {
                        required: true
                    },
                    id: "capacity",
                    name: "Δωμάτια",
                    value: 1,
                    type: "number",
                    placeholder: "1",
                },
                maxOccupants: {
                    rules: {
                        required: true
                    },
                    id: "maxOccupants",
                    name: "Κλίνες",
                    value: this.props.room ? this.props.room['maxOccupants'] : "",
                    type: "number",
                    placeholder: "2",
                },
                cityName: {
                    rules: {
                        required: true
                    },
                    id: "roomName",
                    name: "Πόλη",
                    value: this.props.room ? this.props.room.location['cityname'] : "",
                    type: "text",
                    placeholder: "Athens",
                },
                description: {
        
                    id: "descr",
                    name: "Περιγραφή Δωματίου",
                    value: this.props.room ? this.props.room['description'] : "",
                    type: "textarea",
                    placeholder: "Προσθέστε κάτι σχετικό με το δωμάτιο",
                }
            },
            coords: {
                cordX: this.props.room ? this.props.room.location['cordX'] : "",
                cordY: this.props.room ? this.props.room.location['cordY'] : ""
            },
            facilities: {
                breakfast:  this.props.room ? this.props.room['brekafast'] : false,
                wifi: this.props.room ? this.props.room['wifi'] : false,
                pool: this.props.room ? this.props.room['pool'] : false,
                shauna: this.props.room ? this.props.room['shauna'] : false
            },
			mapModal: false
        }
        
        this.mapToggle = this.mapToggle.bind(this)
    }
   
    mapToggle = () => {
        this.setState(prevState => ({
            mapModal: !prevState.mapModal
        }));
	}
	
	mapClickedHandler = (mapProps, map, e) => {
        console.log(this.state.coords);
        this.setState(
            produce(draft => {
                draft.coords['cordX'] = mapProps.lat;
                draft.coords['cordY'] = mapProps.lng;
            })
        );
		this.mapToggle();
        console.log(mapProps);
        console.log("egine toggle");
        console.log(this.state.coords);
        // this.setState(
        //     produce(draft => {
        //         draft.coords['cordX'] = mapProps.lat;
        //         draft.coords['cordY'] = mapProps.lng;
        //     })
        // );
		// coords['cordX'] = mapProps.lat;
		// coords['cordY'] = mapProps.lng;
	}

	handleCheckBoxChange = (label) => {
        console.log("[FiltersTab.js]");
        console.log("Allakse kati se checkbox sto " + label);
        this.setState(
            produce(draft => {
                draft.facilities[label] = !draft.facilities[label];
            })
        );
        // facilities[label] = !facilities[label];
        console.log(this.state.facilities);
    }

    inputChangedHandler= (event, controlName) => {
		const value = event.target.value;
		this.setState( 
            produce(draft => { 
                draft.formControls[controlName].value = value; 
            }) 
        ); 
    }

    submitForm = (event) => {
		event.preventDefault();
		
		let formData = {};
		formData['providerId'] = JSON.parse(localStorage.getItem('userInfo'))["id"];
		for ( let key in this.state.formControls ) {
            formData[key] = this.state.formControls[key].value;
		}
		
		for(let key in this.state.facilities){
			formData[key] = this.state.facilities[key];
		}

		
		for(let key in this.state.coords){
			formData[key] = this.state.coords[key];
		}

		console.log("---Form Data---");
		console.log(formData);
		console.log(this.state.facilities); 
		console.log(this.state.coords);    
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
				alert("Επιτυχία!");
				this.props.toggleRoomFormModal();//of Myrooms.js
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    editRoomHandler = () => {

		let formData = {};
		// formData['providerId'] = JSON.parse(localStorage.getItem('userInfo'))["id"];
		formData['roomId'] = this.props.room['id'];
		for ( let key in this.state.formControls ) {
            formData[key] = this.state.formControls[key].value;
		}
		
		for(let key in this.state.facilities){
			formData[key] = this.state.facilities[key];
		}

		for(let key in this.state.coords){
			formData[key] = this.state.coords[key];
		}

		console.log("---Form Data---");
		console.log(formData);
		console.log(this.state.facilities); 
		console.log(this.state.coords);    
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
                this.props.toggleRoomFormModal();
            }
        })
        .catch((err) => {
            console.log(err);
        })
		
		// alert("Kanw edit");
	}
	
    
    render(){
		if(!getUserInfo('userInfo').role ==="provider"){
			return(
				<div>How tf did u get here?!??</div>
			);
		}
        const formElementsArray = [];
        for ( let key in this.state.formControls ) {
			let obj = this.state.formControls[key]
			// if(this.state.deletedRoom){
			// 	if(key === 'cityName'){
			// 		obj['value'] = this.state.deletedRoom.location['cityname']
			// 	}
			// 	else{
			// 		obj['value'] = this.state.deletedRoom[key]
			// 	}
			// }
            formElementsArray.push( {
                id: key,
                config: obj
            });
        }
        let formFields = formElementsArray.map( formElement => (
			<FormGroup row	key={formElement.id}>
			<Label for={formElement.config.id} sm={2}>{formElement.config.name}</Label>
			<Col sm={10}>
				<Input 
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
            <Form onSubmit={this.submitForm}>
                {formFields}
                <FormGroup row>
                <Label for="extras" sm={2}>Παροχές</Label>
                <Container>
                    <Checkbox checked={this.state.facilities['breakfast']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('breakfast')}>
                        Πρωινό
                    </Checkbox>
                    <Checkbox checked={this.state.facilities['wifi']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('wifi')}>
                        Wi-Fi
                    </Checkbox>
                    <Checkbox checked={this.state.facilities['shauna']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('shauna')}>
                        Σάουνα
                    </Checkbox>
                    <Checkbox checked={this.state.facilities['pool']} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => this.handleCheckBoxChange('pool')}>
                        Πισίνα
                    </Checkbox>
                </Container>
                </FormGroup>
                <FormGroup row>
                <Label for="map" sm={2}>Τοποθεσία στο Χάρτη</Label>
                <Col sm={10}>
                    {googleMap}
					<Modal className="modal-lg" centered fade 
						isOpen={this.state.mapModal} 
						toggle={this.mapToggle} 
					>
                        <div className={styles.box_border} style={{height: "75vh"}}>
                            {googleMap}
                        </div>
                    </Modal>
                    <FormText color="muted">
                        Επιλέξτε σημείο στο χάρτη, τοποθετώντας το στίγμα στο σημείο που επιθυμείτε 
                    </FormText>
                </Col>
                </FormGroup>
                <Row className={styles['footer-row']}>
                    <hr className={styles['footer-line']} />
                </Row>
                <Row >
                <Col xs="12" sm="12" md="12" lg="12" className={styles['btn-col']}>
                    {this.props.room ? 
                        <Button className={styles['form-buttons']} color="primary" onClick={this.editRoomHandler}>Ολοκλήρωση Επεξεργασίας</Button> : 
                        <Button className={styles['form-buttons']} color="primary" onClick={this.submitForm}>Προσθήκη</Button>
                    }
                    {/* <Button className={styles['form-buttons']} color="primary" onClick={this.submitForm}>Προσθήκη</Button> */}
                    <Button className={styles['form-buttons']} color="secondary" onClick={this.props.toggleRoomFormModal}>Ακύρωση</Button>
                </Col>
                
                </Row>
            </Form>
        );
    }
}



export default RoomForm;