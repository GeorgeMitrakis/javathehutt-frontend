import React, { Component } from 'react';
import { Container, Col, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Get, Post } from 'react-axios';
import { Spinner } from 'reactstrap';
import produce from 'immer';
import RoomForm from '../../../Room/RoomForm/RoomForm';
import FetchProviderRooms from './FetchProviderRooms/FetchProviderRooms'
import { createQueryParams} from '../../../../Utility/Utility';
import axios from 'axios';
import Header from '../../../../components/UI/Header/Header'
import PhotoUrlInput from '../../../Room/RoomForm/PhotoUrlInput'

import styles from './ProviderRooms.module.css'


class ProviderRooms extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			roomFormModal: false,
			deleteRoomModal: false,
			photoInsertModal: false,
			reFetchRooms: false,
			room: null
		};

		this.toggleDeleteRoomModal = this.toggleDeleteRoomModal.bind(this);
		this.toggleRoomFormModal = this.toggleRoomFormModal.bind(this);
		this.togglePhotoModal = this.togglePhotoModal.bind(this);

	}

	//--- photo-insert

	togglePhotoModal = () => {
		this.setState(
            produce(draft => {
				draft.photoInsertModal = !draft.photoInsertModal;
				draft.room = null;
            })
		);
	}

	photoInsertHandler = (room) => {

		this.togglePhotoModal();
		this.setState(
            produce(draft => {
				draft.room = room;
            })
		);

		// if (!this.state.room)
		// {
		// 	alert("PAIXTHKE TROLIA OLO MALAKIES");
		// }

		// alert("ETOIMOS GIA EIKONES MALAKES");
	}

	//--- edit-add room 

	toggleRoomFormModal() {
		this.setState(
            produce(draft => {
				draft.roomFormModal = !draft.roomFormModal;
				draft.room = null;
            })
		);
	}

	editRoomModalHandler = (room) => {
        // alert(room.id)
        this.toggleRoomFormModal();
		this.setState(
            produce(draft => {
				draft.room = room;
            })
		);
	}

	//----delete

	toggleDeleteRoomModal() {
		this.setState(
            produce(draft => {
				draft.deleteRoomModal = !draft.deleteRoomModal;
				draft.room = null;
            })
		);
	}

	deleteRoomModalHandler = (room) => {
        // alert(room.id)
        this.toggleDeleteRoomModal();
		this.setState(
            produce(draft => {
				draft.room = room;
            })
		);
	}
	
	toggleReFetchRooms = () => {
		this.setState(
            produce(draft => {
				draft.reFetchRooms = ! draft.reFetchRooms;
            })
        );
	}

    deleteRoomHandler = () => {
		if (!this.state.room)
		{
			alert("PAIXTHKE TROLIA OLO MALAKIES");
		}

		console.log("------------------");
		console.log("Delete Handler --> id = "+ this.state.room.id);
		console.log("------------------");
		
		let params = {};
		params['roomId'] = this.state.room.id;
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
                this.toggleDeleteRoomModal();
                this.toggleReFetchRooms();
            }
        })
        .catch((err) => {
            console.log(err);
        })
	}

	render(){

        // alert("RENDER PROVIDER ROOMS");
		console.log("===> inside ProviderRooms Render - state:",  this.state)

		return(
				<>
				<Container className={styles['results-container']}>
					<Row className={styles['top-row']}>
						<Col xs="8" sm="8" md="10" lg="10">
							<h3 className={styles['title']}>My rooms</h3>
						</Col>
						<Col xs="4" sm="4" md="2" lg="2">
							<Button className={styles['room-add-btn']} color="success" size="sm" onClick={this.toggleRoomFormModal}>Προσθήκη Δωματίου</Button>
						</Col>
					</Row>
					
                    <FetchProviderRooms 
                        reFetchRooms={this.state.reFetchRooms}
						editRoomModalHandler={this.editRoomModalHandler}
						deleteRoomModalHandler={this.deleteRoomModalHandler}
						photoInsertHandler={this.photoInsertHandler}
					/>
				</Container>


				<Modal isOpen={this.state.roomFormModal} toggle={this.toggleRoomFormModal} className="modal-lg">
					<ModalHeader toggle={this.toggleRoomFormModal}>
						<Header> 
							{this.state.room ? "Επεξεργασία Δωματίου "+this.state.room.roomName : "Προσθήκη Δωματίου"}
						</Header>
					</ModalHeader>
					<ModalBody>
                        <RoomForm 
                            room={this.state.room} 
                            toggleRoomFormModal = {this.toggleRoomFormModal}
                            toggleReFetchRooms = {this.toggleReFetchRooms}
                        />
					</ModalBody>
				</Modal>


				<Modal isOpen={this.state.deleteRoomModal} toggle={this.toggleDeleteRoomModal} className="modal-lg">
					<ModalHeader toggle={this.toggleDeleteRoomModal}> Διαγραφή Δωματίου</ModalHeader>
					<ModalBody>
						Είστε σίγουροι πως επιθύμειτε τη διαγραφή του δωματίου:   
						{this.state.room ? this.state.room.roomName : null} 
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleDeleteRoomModal}>Ακύρωση</Button>
						<Button color="danger" onClick={this.deleteRoomHandler}>Διαγραφή</Button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.photoInsertModal} toggle={this.photoInsertModal} className="modal-lg">
					<ModalHeader toggle={this.photoInsertModal}> {this.state.room ? "Προσθήκη Φωτογραφιών στο "+this.state.room.roomName : "Προσθήκη Φωτογραφιών"}</ModalHeader>
					<ModalBody>
						<PhotoUrlInput />
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.togglePhotoModal}>Ακύρωση</Button>
						<Button color="primary" onClick={this.photoInsertHandler}>Προσθήκη</Button>
					</ModalFooter>
				</Modal>			
			</>
			
		);
	}
}

export default ProviderRooms;