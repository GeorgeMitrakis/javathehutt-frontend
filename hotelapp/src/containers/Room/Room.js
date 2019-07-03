import React from 'react';
import {  withRouter } from 'react-router-dom';


import produce from 'immer';



class Room extends React.Component {

    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleRoomForm = this.toggleRoomForm.bind(this);

        this.state = { 
            expanded: false,
            roomFormModal: false,
            collapse: false 
        };
    }
    
    toggleCollapse() {
        // this.setState(state => (
        //     { collapse: !state.collapse }
        // ));

        this.setState(
            produce(draft => {
                draft.collapse = !draft.collapse;
                if (!draft.expanded)
                {
                    // alert("EXPANEDED ");
                    draft.expanded = true;
                }
            })
        );
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

    render() {

        
    }

}



export default withRouter(Room);