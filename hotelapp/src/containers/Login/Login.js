import React from 'react';
import produce from 'immer';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            formControls: {
                email: {
                    value: '',
                    type: "email",
                    placeholder: "example@example.com"
                },

                password: {
                    value: '',
                    type: "password",
                    placeholder: ''
                }
            }
        };
    }
    
    closeModal = () => {
        this.setState(
            produce(draft => {
                draft.modalIsOpen = false;
            })
        );
    }

    inputChangedHandler = ( event, controlName ) => {
        this.setState(
            produce(draft => {
                draft.formControls[controlName].value = event.target.value;
            })
        );
    }


    submitHandler = ( event ) => {
        event.preventDefault();
        alert("Form Submitted")
    }

    render(){

        const formElementsArray = [];
        for ( let key in this.state.formControls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.formControls[key]
            });
        }

        let formFields = formElementsArray.map( formElement => (
            <MyInput
                key={formElement.id}
                name={formElement.id}
                value={formElement.config.value}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
            />
        ));

        return (
            <Modal  centered size="sm" fade isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.closeModal}>
                    <h3 className={"font-weight-bold rm_hl " + classes.header_color}>Συνδεθείτε</h3>
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.submitHandler}>
                        <p className="small">Μπορείτε να συνδεθείτε χρησιμοποιώντας τον λογαριασμό σας για πρόσβαση στις υπηρεσίες μας.</p>
                        
                        {formFields}

                        <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }

}


export default Login;