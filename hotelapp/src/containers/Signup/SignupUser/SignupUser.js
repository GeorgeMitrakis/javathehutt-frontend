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

    setFormField = (controlName, feedback, validity, value) => {
        this.setState(
            produce(draft => {
                draft.formControls[controlName].feedback = feedback;
                draft.formControls[controlName].validity = validity;
                if (value)
                {
                    draft.formControls[controlName].value = value;
                }
            })
        );
    }

    checkEmailValidity = () => {
        axios.get("http://localhost:8765/app/api/users", 
                {
                    params: {
                        email: this.state.formControls.email.value
                    }
                }
            )
            .then((result) => {
                alert("Email is ok");
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
                // this.setFormField("email", "Το συγκεκριμένο email χρησιμοποιείται ήδη από άλλον λογαριασμό", 'is-invalid', null);
                this.setFormField("email", null, 'is-valid', null);
            })
    }

    inputBlurredHandler = ( event, controlName ) => {
        if ((controlName === "email") && (this.state.formControls.email.validity !== "is-invalid") && (this.state.formControls.email.value.trim() !== '' ))
        {
            //kane get request gia na tsekareis an to email einai piasmeno
            this.checkEmailValidity();

        }
        else if ((controlName === "password1") && (this.state.formControls.password1.validity !== "is-invalid") && (this.state.formControls.password1.value.trim() !== '' ))
        {
            if (this.state.formControls.password.value !== this.state.formControls.password1.value)
            {
                this.setFormField("password1", "Οι κωδικοί δεν ταιριάζουν", "is-invalid", null);
            }
            else if (this.state.formControls.password.validity !== "is-invalid")
            {
                this.setFormField("password1", null, "is-valid", null);
            }
        }
        else if ((controlName === "password") && (this.state.formControls.password1.value.trim() !== ''))
        {
            if (this.state.formControls.password.value !== this.state.formControls.password1.value)
            {
                this.setFormField("password1", "Οι κωδικοί δεν ταιριάζουν", "is-invalid", null);
            }
            else
            {
                this.setFormField("password1", null, "is-valid", null);
            }
        }
    }

    inputChangedHandler = ( event, controlName ) => { 
        const value = event.target.value;
        this.setState( 
            produce(draft => { 
                draft.formControls[controlName].value = value; 
            }) 
        ); 
            
        const res = checkValidity(value, this.state.formControls[controlName].rules);
        if (res.report)
        {
            //console.log("ola eginan ok");
            if ((controlName === "password1") || (controlName === "email"))
            { 
                this.setFormField(controlName, null, '', null);
            }
            else
            {
                this.setFormField(controlName, null, 'is-valid', null);
            }
        }
        else
        {
            this.setFormField(controlName, res.msg, "is-invalid", null);
        }
    }

    setEmailUnavailable = () => {
        this.setFormField("email", "Το συγκεκριμένο email χρησιμοποιείται ήδη από άλλον λογαριασμό", "is-invalid", null);
    }

    setConfirmPasswordErr = () => {
        this.setFormField("password1", "Οι κωδικοί δεν ταιριάζουν", "is-invalid", null);
    }

    submitHandler = ( event ) => {
        event.preventDefault();

        let formData = {};
        let formIsValid = true;
        let errFeedBack = {};
        for ( let key in this.state.formControls ) 
        {
            formData[key] = this.state.formControls[key].value;

            if (this.state.formControls[key].validity === "is-valid")
            {
                continue;
            }

            if (this.state.formControls[key].validity === "is-invalid")
            {
                formIsValid = false;
                continue;
            }

            const res = checkValidity(this.state.formControls[key].value, this.state.formControls[key].rules);
            if (!res.report)
            {
                formIsValid = false;
                errFeedBack[key] = res.msg;
            }
        }

        if (!formIsValid)
        {
            this.setState(
                produce(draft => {
                    for ( let key in errFeedBack ) 
                    {
                        draft.formControls[key].feedback = errFeedBack[key];
                        draft.formControls[key].validity = "is-invalid";
                    }
                })
            );
            return;
        }

        alert("Form Submitted");
        console.log(formData);

        axios.post(
            "http://localhost:8765/app/api/signup",
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
            this.setEmailUnavailable();
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
                placeholder={formElement.config.placeholder}
                feedback={formElement.config.feedback}
                validity={formElement.config.validity}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} 
                blurred={( event ) => this.inputBlurredHandler ( event, formElement.id )}
            />
        ));

        return (
            <Form onSubmit={this.submitHandler}>

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