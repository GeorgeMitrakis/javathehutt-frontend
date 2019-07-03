import React from 'react';
import {  withRouter } from 'react-router-dom';
import RoomPresentation from './RoomPresentation/RoomPresentation';
import {Button,  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { createQueryParams} from '../../Utility/Utility';
import axios from 'axios';

import produce from 'immer';



class Room extends React.Component {

    constructor(props) {
        super(props);

        this.toggleRoomForm = this.toggleRoomForm.bind(this);
        // this.toggleDeleteRoom = this.toggleDeleteRoom.bind(this);

        this.state = { 
            roomFormModal: false,
            // deleteRoomModal: false
        };
    }
    
    toggleRoomForm() {
        // this.setState(state => (
        //     { roomFormModal: !state.roomFormModal }
        // ));
        alert("edit");
        this.setState(
            produce(draft => {
                draft.roomFormModal = !draft.roomFormModal;
            })
        );
    }

    // toggleDeleteRoom() {
    //     this.setState(
    //         produce(draft => {
    //             draft.deleteRoomModal = !draft.deleteRoomModal;
    //         })
    //     );
    // }

    // deleteRoomHandler = () => {
	// 	console.log("------------------");
	// 	console.log("Delete Handler --> id = "+ this.props.room.id);
	// 	console.log("------------------");
		
	// 	let params = {};
	// 	params['roomId'] = this.props.room.id;
	// 	const queryParams = createQueryParams(params);
	// 	// this.props.history.push("/searchresults?" +  JSON.parse(localStorage.getItem('userInfo'))["id"]);
	// 	console.log(queryParams);
	// 	axios.delete("http://localhost:8765/app/api/rooms?"+queryParams)
    //     .then((result) => {
    //         console.log(result);
    //         if (!result.data.success)
    //         {
    //             alert(result.data.message);
    //         }
    //         else
    //         {        
    //             alert("Επιτυχής Διαγραφή!");
    //             this.props.history.replace("/");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
	// }

    render() {
        return (
            <>
            <RoomPresentation
                renderProvFuncs={this.props.renderProvFuncs}
                room={this.props.room}
                deleteFunc = {this.props.toggleDeleteRoom}
                editFunc = {this.props.toggleRoomForm}
            />
            
            </>
        );
        
    }

}



export default withRouter(Room);