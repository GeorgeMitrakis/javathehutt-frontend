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
                            {this.state.activeTab === "user" ? <SignupUser/> : null} 
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