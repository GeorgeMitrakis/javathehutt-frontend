import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './Signup.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';
import SignupUser from './SignupUser/SignupUser';
import SignupProvider from './SignupProvider/SignupProvider';


class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            isUser: true
        };
    }
    
    closeModal = () => {
        this.setState(
            produce(draft => {
                draft.modalIsOpen = false;
            })
        );
    }

    toggle = () => {
        this.setState(
            produce(draft => {
                draft.isUser = !draft.isUser;
            })
        );
    }

    render() {

        return (
            <Modal  centered size="md" fade isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.closeModal}>
                    <h3 className={"font-weight-bold rm_hl " + classes.header_color}>Εγγραφείτε</h3>
                </ModalHeader>

                <ModalBody>
                        
                    {this.state.isUser ? <SignupUser/> : <SignupProvider/>}

                </ModalBody>
            </Modal>
        );
    }

}


export default Signup;