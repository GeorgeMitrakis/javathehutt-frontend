import React from 'react';
import produce from 'immer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import classes from './Signup.module.css';
import { Form, FormGroup, Label, FormFeedback, FormText, Button, Modal, ModalHeader, ModalBody, Input,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import MyInput from '../../components/UI/MyInput/MyInput';
import SignupUser from './SignupUser/SignupUser';
import SignupProvider from './SignupProvider/SignupProvider';
import Header from '../../components/UI/Header/Header';
import { checkValidity } from '../../Utility/Utility';



class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: true,
            activeTab: 'user'
        };

        this.toggleTabs = this.toggleTabs.bind(this);
    }
    
    closeModal = () => {
        // this.setState(
        //     produce(draft => {
        //         draft.modalIsOpen = false;
        //     })
        // );

        this.props.history.push("/");
    }

    toggleTabs = (tab) => {
        if (this.state.activeTab !== tab) 
        {
            this.setState(
                produce(draft => {
                    draft.activeTab = tab;
                })
            );
        }
    }

    //---------------------Form Manipulation------------------------

    setFormField = (FormObj, controlName, feedback, validity, value) => {
        FormObj.setState(
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

    checkEmailValidity = (FormObj) => {
        axios.get("http://localhost:8765/app/api/users", 
                {
                    params: {
                        email: FormObj.state.formControls.email.value
                    }
                }
            )
            .then((result) => {
                alert("Email is ok");
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
                // this.setFormField(FormObj, "email", "Το συγκεκριμένο email χρησιμοποιείται ήδη από άλλον λογαριασμό", 'is-invalid', null);
                this.setFormField(FormObj, "email", null, 'is-valid', null);
            })
    }

    inputBlurredHandler = ( event, FormObj, controlName ) => {
        if ((controlName === "email") && (FormObj.state.formControls.email.validity !== "is-invalid") && (FormObj.state.formControls.email.value.trim() !== '' ))
        {
            //kane get request gia na tsekareis an to email einai piasmeno
            this.checkEmailValidity(FormObj);
        }
        else if ((controlName === "password1") && (FormObj.state.formControls.password1.validity !== "is-invalid") && (FormObj.state.formControls.password1.value.trim() !== '' ))
        {
            if (FormObj.state.formControls.password.value !== FormObj.state.formControls.password1.value)
            {
                this.setFormField(FormObj, "password1", "Οι κωδικοί δεν ταιριάζουν", "is-invalid", null);
            }
            else if (FormObj.state.formControls.password.validity !== "is-invalid")
            {
                this.setFormField(FormObj, "password1", null, "is-valid", null);
            }
        }
        else if ((controlName === "password") && (FormObj.state.formControls.password1.value.trim() !== ''))
        {
            if (FormObj.state.formControls.password.value !== FormObj.state.formControls.password1.value)
            {
                this.setFormField(FormObj, "password1", "Οι κωδικοί δεν ταιριάζουν", "is-invalid", null);
            }
            else
            {
                this.setFormField(FormObj, "password1", null, "is-valid", null);
            }
        }
    }

    inputChangedHandler = ( event, FormObj, controlName ) => { 
        const value = event.target.value;
        FormObj.setState( 
            produce(draft => { 
                draft.formControls[controlName].value = value; 
            }) 
        ); 
            
        const res = checkValidity(value, FormObj.state.formControls[controlName].rules);
        if (res.report)
        {
            //console.log("ola eginan ok");
            if ((controlName === "password1") || (controlName === "email"))
            { 
                this.setFormField(FormObj, controlName, null, '', null);
            }
            else
            {
                this.setFormField(FormObj, controlName, null, 'is-valid', null);
            }
        }
        else
        {
            this.setFormField(FormObj, controlName, res.msg, "is-invalid", null);
        }
    }

    submitHandler = ( event, FormObj ) => {
        event.preventDefault();

        let formData = {};
        let formIsValid = true;
        let errFeedBack = {};
        for ( let key in FormObj.state.formControls ) 
        {
            formData[key] = FormObj.state.formControls[key].value;

            if (FormObj.state.formControls[key].validity === "is-valid")
            {
                continue;
            }

            if (FormObj.state.formControls[key].validity === "is-invalid")
            {
                formIsValid = false;
                continue;
            }

            const res = checkValidity(FormObj.state.formControls[key].value, FormObj.state.formControls[key].rules);
            if (!res.report)
            {
                formIsValid = false;
                errFeedBack[key] = res.msg;
            }
        }

        if (!formIsValid)
        {
            FormObj.setState(
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
            // this.setEmailUnavailable();
        })
    }



    render() {

        console.log(this.props);
        const activeTabStyle = {
            color: "rgb(40, 30, 182)",
            fontWeight: "bold",
            // fontSize: "calc(4px + 2vmin)",
            borderColor: "rgb(40, 30, 182)"
        };

        const inactiveTabStyle = {
            borderColor: "lightgrey"
        };

        return (
            <Modal  centered size="md" fade isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.closeModal}>
                    <Header>
                        Εγγραφή
                    </Header>
                </ModalHeader>

                <ModalBody>
                    <Nav tabs className="justify-content-center" style={{borderColor: "rgb(40, 30, 182)"}}>
                        <NavItem>
                            <NavLink
                                className={"border-bottom-0 pointer " + classnames({ active: this.state.activeTab === 'user' })}
                                onClick={ () => this.toggleTabs('user') }
                                style={ this.state.activeTab === 'user' ? activeTabStyle : inactiveTabStyle }
                            >
                                Επισκέπτης
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={"border-bottom-0 pointer " + classnames({ active: this.state.activeTab === 'provider' })}
                                onClick={() => this.toggleTabs('provider')}
                                style={ this.state.activeTab === 'provider' ? activeTabStyle : inactiveTabStyle }
                            >
                                Πάροχος
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                        <p className="small mt-1">Εγγραφείτε προκειμένου να έχετε πλήρη πρόσβαση σε όλες τις υπηρεσίες μας.</p>
                        <TabPane tabId="user" className="">
                            {this.state.activeTab === "user" 
                            ? 
                                <SignupUser 
                                    inputBlurredHandler={this. inputBlurredHandler}
                                    inputChangedHandler={this.inputChangedHandler}
                                    submitHandler={this.submitHandler}
                                /> 
                            : null} 
                        </TabPane>

                        <TabPane tabId="provider" className="">
                            {this.state.activeTab === "provider" ? <SignupProvider/> : null} 
                        </TabPane>
                    </TabContent>

                </ModalBody>
            </Modal>
        );
    }

}


export default withRouter(Signup);