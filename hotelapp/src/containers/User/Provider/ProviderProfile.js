import React, { Component } from 'react';
import { getUserInfo, checkValidity } from '../../../Utility/Utility';
import Header from '../../../components/UI/Header/Header';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import MyInput from '../../../components/UI/MyInput/MyInput'
import { Card, CardHeader, CardBody, Container, Form, Row, Col } from 'reactstrap';
import classes from './Provider.module.css';
import qs from 'querystring';
import produce from 'immer';
import axios from 'axios';

class ProviderProfile extends Component {
	constructor(props){
		super(props);

		this.email = React.createRef();
		this.providername = React.createRef();

		this.state = {
			email:{
				value: getUserInfo().email,
				rules:{
					required: true,
					isEmail: true
				},
				feedback: null,
				validity: ''

			},
			providername:{
				value: getUserInfo().providername,
				rules:{
					required: true,
					onlyLettersDotsAndSpace: true
				},
				feedback: null,
				validity: ''

			}
			
		};
	}

	inputChangedHandler = (field, value) => {
		const res = checkValidity(value, this.state[field].rules);
		if(!res.report){
			this.setState(
				produce(draft => {
					draft[field].feedback = res.msg;
					draft[field].validity = "is-invalid";
				})
			)
		}
		else{
			this.setState(
				produce(draft => {
					draft[field].feedback = null;
					draft[field].validity = '';
				})
			)
		}
	}

	submitHandler = (event) => {
		event.preventDefault();

		const resemail = checkValidity(this.email.current.value, this.state.email.rules);
		const resprovidername = checkValidity(this.providername.current.value, this.state.providername.rules);

		const res = {
			email: resemail,
			providername: resprovidername
		}

		if(!resemail.report || !resprovidername.report){
			//invalid input
			this.setState(
				produce(draft => {
					for(let i in this.state){
						if(!res[i].report){
							draft[i].feedback = res[i].msg;
							draft[i].validity = "is-invalid";
						}
						else{
							draft[i].feedback = null;
							draft[i].validity = '';
						}
					}				
				})
			);
			return;
		}

		let params = null;
		if(this.email.current.value === getUserInfo().email){
			params = {
				'userId' : getUserInfo().id,
				'providername' : this.providername.current.value 
			}
		}
		else{
			params = {
				'userId' : getUserInfo().id,
				'email' : this.email.current.value,
				'providername' : this.providername.current.value 
			}
		}
		//console.log(this.state);
		axios.put(
			"http://localhost:8765/app/api/users",
			qs.stringify(params),
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		)
		.then((result)=>{
			console.log(result);
			if(result.data.success){
				console.log(result.data);
				let u = {
					email : this.email.current.value,		
					providername : this.providername.current.value,
					id : getUserInfo().id,
					role : getUserInfo().role,
					isBanned : getUserInfo().isBanned
				}  

				localStorage.setItem('userInfo', JSON.stringify(u));

				this.setState(
					produce(draft => {					
						draft.email.value = u.email;					
						draft.providername.value = u.providername;
				}));  
			}
			else{
				console.log(result+".then()");
				if(result.data.message === "Update error: email given is already taken"){
					this.setState(
						produce(draft => {		
							draft.email.feedback = "Η διεύθυνση email χρησιμοποιείται ήδη.";
							draft.email.validity = "is-invalid";
							
					})); 
				}
            }
		})
		.catch((err)=>{
			console.log(err+".err()"); 
		})
	}

	render(){
		return(
			<Container fluid id={classes.content} >
				<Row className="justify-content-center">
					<Col className="align-self-center p-0" xs="auto" lg="4" xl="3">
						<Card>
							<CardHeader>
								<Header>
									Επεξεργασία Προφίλ
								</Header>
							</CardHeader>
							<CardBody>
								<Form onSubmit={this.submitHandler}>	
									<MyInput 
										name='Νέο email:'
										type='text'
										innerRef={this.email}
										defaultValue={this.state.email.value}
										feedback={this.state.email.feedback}
										validity={this.state.email.validity}
										changed={() => this.inputChangedHandler( 'email', this.email.current.value )} 
									/>
									<br/>							
									<MyInput 
										name='Επωνυμία:'
										type='text'
										innerRef={this.providername}
										defaultValue={this.state.providername.value}
										feedback={this.state.providername.feedback}
										validity={this.state.providername.validity}
										changed={() => this.inputChangedHandler( 'providername', this.providername.current.value )} 
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

export default ProviderProfile;