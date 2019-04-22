import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './Signup.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            isUser: true,

            formControlsUser: {
                email: {
                    id: "signup_user",
                    name: "Email",
                    value: '',
                    type: "email",
                    placeholder: "example@example.com"
                },

                password: {
                    id: "signup_user_pwd",
                    name: "Password",
                    value: '',
                    type: "password",
                    placeholder: ''
                },

                password1: {
                    id: "signup_user_pwd_rep",
                    name: "Confirm Password",
                    value: '',
                    type: "password",
                    placeholder: ''
                },

                name: {
                    id: "signup_user_name",
                    name: "'Oνομα",
                    value: '',
                    type: "text",
                    placeholder: "'Ονομα"
                },

                surname: {
                    id: "signup_user_surname",
                    name: "Επίθετο",
                    value: '',
                    type: "text",
                    placeholder: "Επίθετο"
                },

                type: {
                    value: "visitor"
                }
            },

            formControlsProvider: {
                email: {
                    id: "signup_provider",
                    name: "Email",
                    value: '',
                    type: "email",
                    placeholder: "example@provider.com"
                },

                password: {
                    id: "signup_prov_pwd",
                    name: "Password",
                    value: '',
                    type: "password",
                    placeholder: ''
                },

                password1: {
                    id: "signup_prov_pwd_rep",
                    name: "Confirm Password",
                    value: '',
                    type: "password",
                    placeholder: ''
                },

                providername: {
                    id: "signup_prov_name",
                    name: "Επωνυμία επιχείρησης",
                    value: '',
                    type: "text",
                    placeholder: "Επωνυμία επιχείρησης"
                },

                type: {
                    value: "provider"
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

    toggle = () => {
        this.setState(
            produce(draft => {
                draft.isUser = !draft.isUser;
            })
        );
    }

    inputChangedHandler = ( event, controlName ) => {

        //easy immer way
        const formControlsType = this.state.isUser ? "formControlsUser" : "formControlsProvider" ;
        const formControls = produce(this.state.formControlsType, draft => {
            draft[controlName].value = event.target.value
        });

        this.setState({ formControls });
    }


    submitHandler = ( event ) => {
        event.preventDefault();

        let formData = null;
        if (this.state.isUser)
        {
            formData = {
                'email': this.state.formControls.email.value,
                'password': this.state.formControls.password.value
            }
        }
        else
        {

        }

        // const formData = {
        //     'email': "exaple@exaple.com",
        //     'password': "mypass"
        // }

        console.log(formData);

        axios.post(
            "http://localhost:8765/app/api/login",
            formData,
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            alert("Form Submitted");
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
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