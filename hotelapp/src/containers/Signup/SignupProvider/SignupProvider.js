import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './SignupProvider.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../../components/UI/MyInput/MyInput';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';

class SignupProvider extends React.Component {

    state = {

        formControls: {
            email: {
                required: true,
                id: "signup_provider",
                name: "Email",
                value: '',
                type: "email",
                placeholder: "example@provider.com"
            },

            password: {
                required: true,
                id: "signup_prov_pwd",
                name: "Password",
                value: '',
                type: "password",
                placeholder: ''
            },

            password1: {
                required: true,
                id: "signup_prov_pwd_rep",
                name: "Confirm Password",
                value: '',
                type: "password",
                placeholder: ''
            },

            providername: {
                required: true,
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

    }

    inputChangedHandler = ( event, controlName ) => {

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
            if (key === "type")
            {
                continue;
            }
            formData[key] = this.state.formControls[key].value;
        }

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
            if (key === "type")
            {
                continue;
            }

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
            <Form onSubmit={this.submitHandler}>
                <p className="small">Εγγραφείτε προκειμένου να έχετε πλήρη πρόσβαση σε όλες τις υπηρεσίες μας.</p>

                {formFields}

                {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Εγγραφή</Button> */}
                <SubmitBtn classes="float-right">
                    Εγγραφή
                </SubmitBtn>
            </Form>
        );
    }

}

export default SignupProvider;