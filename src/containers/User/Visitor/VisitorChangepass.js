import React, { Component } from 'react';
import { getUserInfo, checkValidity } from '../../../Utility/Utility';
import Header from '../../../components/UI/Header/Header';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import MyInput from '../../../components/UI/MyInput/MyInput'
import { Card, CardHeader, CardBody, Container, Form,  
	Row, Col, Alert } from 'reactstrap';
import classes from './Visitor.module.css';
import qs from 'querystring';
import produce from 'immer';
import axios from 'axios';

class VisitorPassword extends Component {
	constructor(props){
		super(props);

		this.oldpassword = React.createRef();
		this.newpassword = React.createRef();
		this.newpassword1 = React.createRef();
		
		this.state = {
			oldpassword: {
                feedback: null,
				validity: '',
				timeschanged: 1
			},
			password: {
				rules: {
                    required: true,
                    isPassword: true,
                    minLength: 6,
                    maxLength: 15
                },
                feedback: null,
                validity: ''
			},
			password1: {
                rules: {
                    required: true,
                    mustMatch: "password"
				},
                feedback: null,
                validity: ''
			},
			alert:{
				color:'',
				visible: false,
				message:''
			}
		}

		this.onDismiss = this.onDismiss.bind(this);
	}

	submitHandler = (event) => {
		event.preventDefault();

		//check if new password matches regex
		const res = checkValidity(this.newpassword.current.value, this.state.password.rules);
		if(!res.report){
			this.setState(
				produce( draft => {
					draft.password.feedback = res.msg;
					draft.password.validity = "is-invalid";
					
				})
			)
			return;
		}
		else{
			this.setState(
				produce( draft => {
					draft.password.feedback = null;
					draft.password.validity = '';
					
				})
			)
		}

		//check if password re-enter is correct
		if(this.newpassword.current.value !== this.newpassword1.current.value){
			this.setState(
				produce( draft => {
					draft.password1.feedback = "Οι κωδικοί δεν ταιριάζουν";
					draft.password1.validity = "is-invalid";
					
				})
			)
		}
		else{
			this.setState(
				produce( draft => {
					draft.password1.feedback = null;
					draft.password1.validity = '';
					
				})
			)
		}


		let params = {
			'userId' : getUserInfo('userInfo').id,
			'oldPassword' : this.oldpassword.current.value,
			'newPassword' : this.newpassword.current.value
		}

		axios.put(
			"http://localhost:8765/app/api/users",
			qs.stringify(params),
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		)
		.then((result) =>{
			console.log(result);
			if(result.data.success){
				console.log(result.data);
				window.scrollTo(0, 0);
				this.setState(
					produce( draft => {
						draft.alert.color="success";
						draft.alert.message = "Ο Κωδικός Πρόσβασης άλλαξε με επιτυχία!";
						draft.alert.visible = true;
						
						draft.oldpassword.feedback = null;
						draft.oldpassword.validity = '';
					})
				)
			}
			else{
				console.log(result.data.message);
				this.setState(
					produce( draft => {
						draft.alert.color="danger";
						draft.alert.message = "Ο Κωδικός Πρόσβασης είναι λάθος";
						draft.alert.visible = true;

						//draft.oldpassword.feedback = "Λάθος κωδικός";
						draft.oldpassword.validity = "is-invalid";
						
					})
				)
			}

		})
		.catch((err) =>{
			console.log(err);
		})
	}

	inputChangedHandler = (field, value) => {
		if(field === 'password'){
			const res = checkValidity(value, this.state[field].rules);
			if(!res.report){
				this.setState(
					produce( draft => {
						draft[field].feedback = res.msg;
						draft[field].validity = "is-invalid";
						
					})
				)
			}
			else{
				this.setState(
					produce( draft => {
						draft[field].feedback = null;
						draft[field].validity = '';
						
					})
				)
			}
		}
		else if(field === 'password1'){
			if(this.newpassword.current.value !== value){
				this.setState(
					produce( draft => {
						draft[field].feedback = "Οι κωδικοί δεν ταιριάζουν";
						draft[field].validity = "is-invalid";
						
					})
				)
			}
			else{
				this.setState(
					produce( draft => {
						draft[field].feedback = null;
						draft[field].validity = '';
						
					})
				)
			}
		}
	}


	onDismiss = () => {
		this.setState(
			produce( draft => {
				draft.alert.visible = false;
			})
		)
	}


	render(){
		return(
			<Container fluid id={classes.content} >
				<Row className="justify-content-center">
					<Alert color={this.state.alert.color} isOpen={this.state.alert.visible} toggle={() => (this.onDismiss())}>
						{this.state.alert.message}
					</Alert>
				</Row>
				<Row className="justify-content-center">
					<Col className="align-self-center p-0" xs="auto" lg="4" xl="3">
						<Card>
							<CardHeader>
								<Header>
									Αλλαγή Κωδικού
								</Header>
							</CardHeader>
							<CardBody>
								<Form onSubmit={this.submitHandler}>	
									<MyInput 
										name="Τρέχων κωδικός:"
										type= "password"
										innerRef={this.oldpassword}
										feedback={this.state.oldpassword.feedback}
										validity={this.state.oldpassword.validity}
									/>
									<br/>							
									<MyInput 
										name="Νέος κωδικός:"
										type= "password"
										innerRef={this.newpassword}
										feedback={this.state.password.feedback}
										validity={this.state.password.validity}
										changed={() => this.inputChangedHandler( 'password', this.newpassword.current.value )}
									/>
									<br/>						
									<MyInput  
										name="Επανάληψη νέου κωδικού:"
										type= "password"
										innerRef={this.newpassword1}
										feedback={this.state.password1.feedback}
										validity={this.state.password1.validity}
										changed={() => this.inputChangedHandler( 'password1', this.newpassword1.current.value )}
									/>
									<br/>
									<SubmitBtn classes="float-right">
										Ενημέρωση
									</SubmitBtn>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default VisitorPassword;