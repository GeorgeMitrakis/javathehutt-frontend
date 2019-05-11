import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';
import Header from '../../components/UI/Header/Header';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import { checkValidity } from '../../Utility/Utility';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: true,
            formControls: {
                email: {
                    rules: {
                        required: true,
                        isEmail: true
                    },
                    id: "login_email",
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
                    },
                    id: "login_pwd",
                    name: "Password",
                    value: '',
                    type: "password",
                    placeholder: '',
                    feedback: null,
                    validity: ''
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

    setFormField = (controlName, feedback, validity, value) => {
        const formControls = produce(this.state.formControls, draft => {
            draft[controlName].feedback = feedback;
            draft[controlName].validity = validity;
            if (value)
            {
                draft[controlName].value = value;
            }
        });

        this.setState({ formControls });
    }

    inputBlurredHandler = ( event, controlName ) => {

        // if (this.state.formControls[controlName].value.trim() !== '' )
        // {
            const res = checkValidity(this.state.formControls[controlName].value, this.state.formControls[controlName].rules);
            if (!res.report)
            {
                console.log("LA80S");
                const formControls = produce(this.state.formControls, draft => {
                    draft[controlName].feedback = res.msg;
                    draft[controlName].validity = "is-invalid";
                });
        
                this.setState({ formControls });

                this.setFormField(controlName, res.msg, "is-invalid", null);
            }
        // }
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

        // if (this.state.formControls[controlName].value.trim() !== '' && 
        if (this.state.formControls[controlName].validity === "is-invalid")
        {
            const res = checkValidity(this.state.formControls[controlName].value, this.state.formControls[controlName].rules);
            if (res.report)
            {
                console.log("ola ok");
                const formControls = produce(this.state.formControls, draft => {
                    draft[controlName].feedback = null;
                    draft[controlName].validity = '';
                    draft[controlName].value = event.target.value;
                });
        
                this.setState({ formControls });
                return;
            }
        }

        //easy immer way
        const formControls = produce(this.state.formControls, draft => {
            draft[controlName].value = event.target.value
        });

        this.setState({ formControls });
    }

    setFormWithError = () => {
        const formControls = produce(this.state.formControls, draft => {
            
            draft.password.feedback = "Εισάγατε λανθασμένα στοιχεία";
            draft.password.validity = "is-invalid";
            draft.password.value = '';
            
            draft.email.validity = "is-invalid";
            draft.email.feedback = null;
            draft.email.value = '';
            
        });

        this.setState({ formControls });
    }

    submitHandler = ( event ) => {
        event.preventDefault();

        // if (!)
        // this.resetForm();
        // return;

        let formData = {};
        for ( let key in this.state.formControls ) 
        {
            const res = checkValidity(this.state.formControls[key].value, this.state.formControls[key].rules);
            formData[key] = this.state.formControls[key].value;
        }

        // const formData = {
        //     'email': this.state.formControls.email.value,
        //     'password': this.state.formControls.password.value
        // }

         const formData2 = {
             'email': "exaple@exaple.com",
             'password': "mypass"
         }

        console.log(formData);

        var qs = require('querystring');
        

        axios.post(
            "http://localhost:8765/app/api/login",
            qs.stringify(formData),
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
            this.setFormWithError();
            // this.setState(
            //     produce(draft => {
            //         draft.formControls.password.feedback = "Εισάγατε λανθασμένα στοιχεία";
            //         draft.formControls.password.validity = "is-invalid";
            //         draft.formControls.email.validity = "is-invalid";
            //     })
            // );
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