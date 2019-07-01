import React, { Component } from 'react';
import { getUserInfo, checkValidity } from '../../../Utility/Utility';
import Header from '../../../components/UI/Header/Header';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import MyInput from '../../../components/UI/MyInput/MyInput'
import { Card, CardHeader, CardBody, Container, Form, FormGroup, Input } from 'reactstrap';
import classes from './Visitor.module.css';
import qs from 'querystring';
import produce from 'immer';
import axios from 'axios';
class VisitorProfile extends Component {
	constructor(props){
		super(props);
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
			name:{
				value: getUserInfo().name,
				rules:{
					required: true,
					onlyLetters: true
				},
				feedback: null,
				validity: ''

			},
			surname:{
				value: getUserInfo().surname,
				rules:{
					required: true,
					onlyLetters: true
				},
				feedback: null,
				validity: ''

			}
		};

		this.email = React.createRef();
		this.fname = React.createRef();
		this.lname = React.createRef();
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
		const resname = checkValidity(this.fname.current.value, this.state.name.rules);
		const ressurname = checkValidity(this.lname.current.value, this.state.surname.rules);

		const res = {
			email: resemail,
		 	name: resname,
		 	surname: ressurname
		}

		if(!resemail.report || !resname.report || !ressurname.report){
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

		let params = {
			'userId' : getUserInfo().id,
			'email' : this.email.current.value,
			'name' : this.fname.current.value ,
			'surname' : this.lname.current.value 
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
					name : this.fname.current.value,	
					surname : this.lname.current.value,
					id : getUserInfo().id,
					role : getUserInfo().role,
					isBanned : getUserInfo().isBanned
				}  

				localStorage.setItem('userInfo', JSON.stringify(u));

				this.setState(
					produce(draft => {					
						draft.email.value = u.email;					
						draft.name.value = u.name;					
						draft.surname.value = u.surname;
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
					<Card>
						<CardHeader className="justify-content-center">
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
									name='Όνομα:'
									type='text'
									innerRef={this.fname}
									defaultValue={this.state.name.value}
									feedback={this.state.name.feedback}
									validity={this.state.name.validity}
									changed={() => this.inputChangedHandler( 'name', this.fname.current.value )} 
								/>
								<br/>						
								<MyInput 
									name='Επώνυμο:'
									type='text'
									innerRef={this.lname}
									defaultValue={this.state.surname.value}
									feedback={this.state.surname.feedback}
									validity={this.state.surname.validity}
									changed={() => this.inputChangedHandler( 'surname', this.lname.current.value )} 
								/>
								<br/>
								<SubmitBtn classes="float-right">
									Ενημέρωση
								</SubmitBtn>
							</Form>
						</CardBody>
					</Card>
				</Container>
				
		);
	}
}

export default VisitorProfile;