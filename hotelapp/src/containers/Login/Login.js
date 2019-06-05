import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import classes from './Login.module.css';
import { Card, CardTitle, CardHeader, CardBody, CardText, Container, Row, Col, Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import MyInput from '../../components/UI/MyInput/MyInput';
import Header from '../../components/UI/Header/Header';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import { checkValidity } from '../../Utility/Utility';
import qs from 'querystring';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //modalIsOpen: true,
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
                        required: true
                    },
                    id: "login_pwd",
                    name: "Κωδικός",
                    value: '',
                    type: "password",
                    placeholder: '',
                    feedback: null,
                    validity: ''
                }
            }
        };
    }
    
    // closeModal = () => {
    //     // this.setState(
    //     //     produce(draft => {
    //     //         draft.modalIsOpen = false;
    //     //     })
    //     // );

    //     this.props.history.push("/");
    //     // this.props.history.goBack();
    // }

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
            this.setFormField(controlName, null, '', null);
        }
        else
        {
            this.setFormField(controlName, res.msg, "is-invalid", null);
        }       
    }

    setFormWithError = () => {
        this.setState(
            produce(draft => {
                draft.formControls.password.value = '';
                draft.formControls.password.feedback = "Εισάγατε λανθασμένα στοιχεία";
                draft.formControls.password.validity = "is-invalid";
          
                draft.formControls.email.value = '';
                draft.formControls.email.feedback = null;
                draft.formControls.email.validity = "is-invalid";
            })
        );
    }

    submitHandler = ( event ) => {
        event.preventDefault();

        let formData = {};
        let formIsValid = true;
        let errFeedBack = {};
        for ( let key in this.state.formControls ) 
        {
            const res = checkValidity(this.state.formControls[key].value, this.state.formControls[key].rules);
            if (!res.report)
            {
                formIsValid = false;
                errFeedBack[key] = res.msg;
            }
            formData[key] = this.state.formControls[key].value;
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

        //  const formData2 = {
        //      'email': "exaple@exaple.com",
        //      'password': "mypass"
        //  }

        console.log("---Form Data---");
        console.log(formData);    
        console.log("---------------");
    
        axios.post(
            "http://localhost:8765/app/api/login",
            qs.stringify(formData),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            // alert("Form Submitted");
            console.log(result);
            if (!result.data.success)
            {
                console.log("login NOT successful");
                this.setFormWithError();
            }
            else
            {
                console.log("login Successful");
                this.props.logIn(result.data.data);
                this.props.history.goBack();
            }
        })
        .catch((err) => {
            console.log(err);
            // this.props.logIn("demo_auth_token_1234");
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
            />
        ));

        return (               
            <Container fluid id={classes.content}>
                <Row className="justify-content-center">
                    <Col xs="4"></Col>
                    <Col className="align-self-center p-0" xs="auto">
                        <Card id={classes.login_form}>
                            <CardHeader>
                                <Header>
                                    Σύνδεση
                                </Header>
                            </CardHeader>

                            <CardBody>
                                <CardText>
                                    <p className="small text-muted">Μπορείτε να συνδεθείτε χρησιμοποιώντας τον λογαριασμό σας προκειμένου να έχετε πρόσβαση στις υπηρεσίες μας.</p>
                                </CardText>

                                <Form onSubmit={this.submitHandler}>
                                    {formFields}
                                    {/* <Button className="float-right font-weight-bold" id={classes.submit_btn}>Είσοδος</Button> */}
                                    <SubmitBtn classes="float-right">
                                        Είσοδος
                                    </SubmitBtn>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4"></Col>
                </Row>
            </Container>
        );
    }

}


export default withRouter(Login);