import React from 'react';
import produce from 'immer';
import { Redirect } from 'react-router-dom';
import classes from './Signup.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            email: null,
            password: null,
            AFM: null,
            name: null,
            suranme:null,
            businessName: null
        };
    }
    
    closeModal = () => {
        this.setState(
            produce(draft => {
                draft.modalIsOpen = false;
            })
        );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        alert("Form Submitted")
    }

    render(){
        return (
            <Modal centered size="md" fade isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.closeModal}>
                    <h className={"font-weight-bold rm_hl " + classes.header_color}>Εγγραφείτε</h>
                </ModalHeader>

                <ModalBody>
                        <p className="small">Μπορείτε να εγγραφείτε προκειμένου να έχετε πλήρη πρόσβαση στις υπηρεσίες μας.</p>
                </ModalBody>
            </Modal>
);
}

}


export default Signup;