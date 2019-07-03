import React, { Component } from 'react';
import { Container, Col, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Get, Post } from 'react-axios';
import { Spinner } from 'reactstrap';
import produce from 'immer';
import RoomForm from '../../../Room/RoomForm/RoomForm';
import Room from '../../../Room/Room';
import FetchProviderRooms from './FetchProviderRooms/FetchProviderRooms'
import { createQueryParams} from '../../../../Utility/Utility';
import axios from 'axios';


import styles from './ProviderRooms.module.css'


class ProviderRooms extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			roomFormModal: false,
			deleteRoomModal: false,
			
			reRender: false,
			room: null
		};

		this.toggleDeleteRoomModal = this.toggleDeleteRoomModal.bind(this);
		this.toggleRoomFormModal = this.toggleRoomFormModal.bind(this);

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
		alert(room.id)
		this.setState(
            produce(draft => {
				draft.room = room;
            })
		);
		this.toggleRoomFormModal();
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
		alert(room.id)
		this.setState(
            produce(draft => {
				draft.room = room;
            })
		);
		this.toggleDeleteRoomModal();
	}
	

	// resetState = () => {
	// 	this.setState(
    //         produce(draft => {
    //             draft.performSearchText = !draft.performSearchText;
    //         })
    //     );
	// }

	// toggleReRender = (room, action) => {
	// 	this.setState(
    //         produce(draft => {
	// 			draft.reRender = !draft.reRender;
	// 			draft.room = room;
    //         })
    //     );
	// }
		
	
	

	// addRoomToggle = () => {
	// 	this.setState(prevState => ({
    //         addRoomModal: !prevState.addRoomModal
    //     }));
	// }

	
	// roomsChangedHandler = () => {	
			
	// 	this.setState(
	// 		produce( draft => {
	// 			draft.roomAdded = !this.state.roomAdded;
	// 		})
	// 	)
	// }

	// toggleDeleteRoom() {
    //     this.setState(
    //         produce(draft => {
    //             draft.deleteRoomModal = !draft.deleteRoomModal;
    //         })
    //     );
    // }

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
            }
        })
        .catch((err) => {
            console.log(err);
        })
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
							<Button className={styles['room-add-btn']} color="success" size="sm" onClick={this.toggleRoomFormModal}>Προσθήκη Δωματίου</Button>
						</Col>
					</Row>
					
					<FetchProviderRooms 
						editRoomModalHandler={this.editRoomModalHandler}
						deleteRoomModalHandler={this.deleteRoomModalHandler}
					/>
				</Container>


				<Modal isOpen={this.state.roomFormModal} toggle={this.toggleRoomFormModal} className="modal-lg">
					<ModalHeader toggle={this.toggleRoomFormModal}>Προσθήκη Δωματίου</ModalHeader>
					<ModalBody>
						<RoomForm room={this.state.room} addRoomToggle = {this.addRoomToggle}/>
					</ModalBody>
				</Modal>


				<Modal isOpen={this.state.deleteRoomModal} toggle={this.toggleDeleteRoomModal} className="modal-lg">
					<ModalHeader toggle={this.toggleDeleteRoomModal}> Διαγραφή Δωματίου</ModalHeader>
					<ModalBody>
						Είστε σίγουροι πως επιθύμειτε τη διαγραφή του δωματίου: 
						{this.state.room ? this.state.room.roomName : null} 
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.deleteRoomHandler}>Διαγραφή</Button>
						<Button color="secondary" onClick={this.toggleDeleteRoomModal}>Ακύρωση</Button>
					</ModalFooter>
				</Modal>			
			</>
			
		);
	}
}

export default ProviderRooms;