import React from 'react';
import {  withRouter } from 'react-router-dom';
import RoomPresentation from './RoomPresentation/RoomPresentation';


import produce from 'immer';



class Room extends React.Component {

    constructor(props) {
        super(props);

        this.toggleRoomForm = this.toggleRoomForm.bind(this);
        this.toggleDeleteRoom = this.toggleDeleteRoom.bind(this);

        this.state = { 
            roomFormModal: false,
            deleteRoomModal: false
        };
    }
    
    toggleRoomForm() {
        // this.setState(state => (
        //     { roomFormModal: !state.roomFormModal }
        // ));

        this.setState(
            produce(draft => {
                draft.roomFormModal = !draft.roomFormModal;
            })
        );
    }

    toggleDeleteRoom() {
        this.setState(
            produce(draft => {
                draft.deleteRoomModal = !draft.deleteRoomModal;
            })
        );
    }

    render() {
        return (
            <RoomPresentation
                renderProvFuncs={this.props.renderProvFuncs}
                room={this.props.room}
            />
        );
        
    }

}



export default withRouter(Room);