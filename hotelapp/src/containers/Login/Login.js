import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';
import Header from '../../components/UI/Header/Header';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            formControls: {
                email: {
                    required: true,
                    id: "login_email",
                    name: "Email",
                    value: '',
                    type: "email",
                    placeholder: "example@example.com"
                },

                password: {
                    required: true,
                    id: "login_pwd",
                    name: "Password",
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
        // tryhard way
        // const updatedControls = {
        //     ...this.state.formControls,
        //     [controlName]: {
        //         ...this.state.formControls[controlName],
        //         value: event.target.value
        //     }
        // };
        // this.setState( { formControls: updatedControls } );

        //easy immer way
        const formControls = produce(this.state.formControls, draft => {
            draft[controlName].value = event.target.value
        });

        this.setState({ formControls });
    }


    submitHandler = ( event ) => {
        event.preventDefault();

        let formData = {};
        for ( let key in this.state.formControls ) 
        {
            formData[key] = this.state.formControls[key].value;
        }

        // const formData = {
        //     'email': this.state.formControls.email.value,
        //     'password': this.state.formControls.password.value
        // }

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
                required={formElement.config.required}
                placeholder={formElement.config.placeholder}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
            />
        ));

        return (
            <Modal  centered size="sm" fade isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.closeModal}>
                    <Header>
                        Σύνδεση
                    </Header>
                </ModalHeader>

                <ModalBody>
                    <Form onSubmit={this.submitHandler}>
                        <p className="small">Μπορείτε να συνδεθείτε χρησιμοποιώντας τον λογαριασμό σας για πρόσβαση στις υπηρεσίες μας.</p>
                        
                        {formFields}

                        {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button> */}
                        <SubmitBtn classes="float-right">
                            Είσοδος
                        </SubmitBtn>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }

}


export default Login;