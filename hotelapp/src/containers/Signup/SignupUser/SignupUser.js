import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './SignupUser.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../../components/UI/MyInput/MyInput';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import { checkValidity } from '../../../Utility/Utility';


class SignupUser extends React.Component {

    state = {
        formControls: {
            email: {
                rules: {
                    required: true,
                    isEmail: true
                },
                id: "signup_user",
                name: "Email",
                value: '',
                type: "text",
                placeholder: "example@example.com",
                feedback: null,
                validity: ''
            },

            password: {
                rules: {
                    required: true,
                    isPassword: true,
                    minLength: 6,
                    maxLength: 15
                },
                id: "signup_user_pwd",
                name: "Κωδικός",
                value: '',
                type: "password",
                placeholder: '',
                feedback: null,
                validity: ''
            },

            password1: {
                rules: {
                    required: true,
                    mustMatch: "password"
                },
                id: "signup_user_pwd_rep",
                name: "Επιβεβαίωση Κωδικού",
                value: '',
                type: "password",
                placeholder: '',
                feedback: null,
                validity: ''
            },

            name: {
                rules: {
                    required: true,
                    onlyLetters: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "signup_user_name",
                name: "'Oνομα",
                value: '',
                type: "text",
                placeholder: "'Ονομα",
                feedback: null,
                validity: ''
            },

            surname: {
                rules: {
                    required: true,
                    onlyLetters: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "signup_user_surname",
                name: "Επίθετο",
                value: '',
                type: "text",
                placeholder: "Επίθετο",
                feedback: null,
                validity: ''
            }
        }
    }

    render(){

        const formElementsArray = [];
        for ( let key in this.state.formControls ) 
        {
            formElementsArray.push( {
                id: key,
                config: this.state.formControls[key]
            });
        }

        let formFields = formElementsArray.map( formElement => (
            <MyInput
                key={formElement.id}
                id={formElement.config.id}
                name={formElement.config.name}
                value={formElement.config.value}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                feedback={formElement.config.feedback}
                validity={formElement.config.validity}
                changed={( event ) => this.props.inputChangedHandler( event, this, formElement.id )} 
                blurred={( event ) => this.props.inputBlurredHandler ( event, this, formElement.id )}
            />
        ));

        return (
            <Form onSubmit={( event ) => this.props.submitHandler(event, this)}>

                {formFields}

                {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Εγγραφή</Button> */}
                <SubmitBtn classes="float-right">
                    Εγγραφή
                </SubmitBtn>
            </Form>
        );
    }

}

export default SignupUser;