import React from 'react';
import produce from 'immer';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            email: null,
            password: null
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
            <Modal className="modal-sm" fade isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.closeModal}>
                    <h3 className={"font-weight-bold rm_hl " + classes.header_color}>Συνδεθείτε</h3>
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.submitHandler}>
                        <p className="small">Μπορείτε να συνδεθείτε χρησιμοποιώντας τον λογαριασμό σας για πρόσβαση στις υπηρεσίες μας.</p>
                        <FormGroup>
                            <Label for="email" className="font-weight-bold small">Email</Label>
                            <Input required type="email" className="" id="email" placeholder="exaple@exaple.com"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password" className="font-weight-bold small">Password</Label>
                            <Input required type="password" className="" id="password" />
                        </FormGroup>

                        <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }

}


export default Login;