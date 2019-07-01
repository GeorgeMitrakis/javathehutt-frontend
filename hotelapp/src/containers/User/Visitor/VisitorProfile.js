import React, { Component } from 'react';
import { getUserInfo } from '../../../Utility/Utility';
import Header from '../../../components/UI/Header/Header';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import { Card, CardHeader, CardBody, Container, Form, FormGroup, Input } from 'reactstrap';
import classes from './Visitor.module.css';
import qs from 'querystring';
import produce from 'immer';
import axios from 'axios';
class VisitorProfile extends Component {
	constructor(props){
		super(props);
		this.state = getUserInfo();
		this.email = React.createRef();
		this.fname = React.createRef();
		this.lname = React.createRef();
	}

	submitHandler = (event) => {
		event.preventDefault();
		let params = {
			'userId' : this.state.id,
			'email' : this.email.current.value,
			'name' : this.fname.current.value ,
			'surname' : this.lname.current.value 
		}
		//console.log(this.state);
		axios.put(
			"http://localhost:8765/app/api/users",
			{
				'userId' : this.state.id,
				'email' : this.email.current.value,
				'name' : this.fname.current.value ,
				'surname' : this.lname.current.value 
			},
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		)
		.then((result)=>{
			console.log(result);
			if(result.data.success){
				console.log(result.data.data);
				let u = {
					email : params.email,		
					name : params.name,	
					surname : params.surname,
					id : this.state.id,
					role : this.state.role,
					isBanned : this.state.isBanned
				}  

				localStorage.setItem('userInfo', JSON.stringify(u));

				this.setState(
					produce(draft => {					
					draft = u;
				}));  
			}
			else{
                console.log(result+".then()");
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
								<FormGroup>		
									<p>Νέο email:</p>							
									<Input 
										name='email'
										type='text'
										innerRef={this.email}
										defaultValue={this.state.email}
									/>
								</FormGroup>
								<br/>
								<FormGroup>		
									<p>Όνομα:</p>							
									<Input 
										name='firstname'
										type='text'
										innerRef={this.fname}
										defaultValue={this.state.name}
									/>
								</FormGroup>
								<br/>
								<FormGroup>		
									<p>Επώνυμο:</p>							
									<Input 
										name='lastname'
										type='text'
										innerRef={this.lname}
										defaultValue={this.state.surname}
									/>
								</FormGroup>
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