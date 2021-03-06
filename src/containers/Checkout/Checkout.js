import React, { Component } from 'react';
import produce from 'immer';
import { withRouter } from 'react-router-dom';
import Header from '../../components/UI/Header/Header';
import MyInput from '../../components/UI/MyInput/MyInput';
import { checkValidity } from '../../Utility/Utility';
import { Row, Col, Form, FormGroup, Container, Label,
	InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardHeader, CardBody, Alert } from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import classes from './Checkout.module.css';
import axios from 'axios';
import { getQueryParams, getUserInfoField } from '../../Utility/Utility';
import qs from "querystring";
import BookSuccess from './BookSuccess';

class Checkout extends Component{

    constructor(props){
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state={
            dropdownOpen: false,
            
            card: {
                id: {
					value:'',
					rules:{
						required: true,
						minLength: 16,
						maxLength: 16,
						isNumeric: true
					},
					feedback: null,
					validity: ''
				},
                csc: {
					value:'',
					rules:{
						required: true,
						minLength: 3,
						maxLength: 3,
						isNumeric: true
					},
					feedback: null,
					validity: ''
				},
                expdate:{
					value: '',
					rules:{
						required: true
					},
					feedback: null,
					validity: ''
				},

                type: "Visa",
			},
			roomName: null,
			alert: {
				visible: false,
				message: '',
			}
		}
		
		this.submitForm = this.submitForm.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
    }

    toggleDropDown() {
        this.setState(
            produce(draft => {
                draft.dropdownOpen = !this.state.dropdownOpen;
            })
        );
    }

    handleCardId(event){
        let id=event.target.value;
        let res = checkValidity(id, this.state.card.id.rules);
		this.setState(
            produce(draft => {
				draft.card.id.value = id;
				if(!res.report){
					draft.card.id.feedback = res.msg;
					draft.card.id.validity = "is-invalid";
				}
				else{
					draft.card.id.feedback = null;
					draft.card.id.validity = '';
				}
            })
        );
    }

    handleCSC(event){
        let csc=event.target.value;
        let res = checkValidity(csc, this.state.card.csc.rules);
        this.setState(
            produce(draft => {
				draft.card.csc.value = csc;
				if(!res.report){
					draft.card.csc.feedback = res.msg;
					draft.card.csc.validity = "is-invalid";
				}
				else{
					draft.card.csc.feedback = null;
					draft.card.csc.validity = '';
				}
            })
        );
    }

    handleCardExpdate(event){
        let expdate=event.target.value;
        let res = checkValidity(expdate, this.state.card.expdate.rules);
        this.setState(
            produce(draft => {
				draft.card.expdate.value = expdate;
				if(!res.report){
					draft.card.expdate.feedback = res.msg;
					draft.card.expdate.validity = "is-invalid";
				}
				else{
					draft.card.expdate.feedback = null;
					draft.card.expdate.validity = '';
				}
            })
        );
    }

    handleCardType(type){
        this.setState(
            produce(draft => {
                draft.card.type = type;
            })
        );
    }


    //the method below returns the current date in form "YYYY-MM-DD"
    todayIs(){
        let initialdate = new Date();
        let fulldate = "";
        fulldate  = fulldate  + initialdate.getFullYear() +"-";
        if(initialdate.getMonth()+1<10)
            fulldate  = fulldate  + "0";
        fulldate  = fulldate  +  (initialdate.getMonth()+1) +"-";
        if(initialdate.getDate()<10)
            fulldate  = fulldate  + "0";
        fulldate  = fulldate  +  initialdate.getDate();

        return fulldate;
    }

    

    submitForm = (event, bookingInfo) => {
		event.preventDefault();

		let resid = checkValidity(this.state.card.id.value, this.state.card.id.rules);
		let rescsc = checkValidity(this.state.card.csc.value, this.state.card.csc.rules);
		let resexpdate = checkValidity(this.state.card.expdate.value, this.state.card.expdate.rules);
		

		const res = {
			id: resid,
			csc: rescsc,
		 	expdate: resexpdate
		}
		console.log(res);
		console.log(this.state);
		if(!resid.report || !rescsc.report || !resexpdate.report){
			this.setState(
				produce(draft => {
					for(let i in res){
						if(!res[i].report){
							draft.card[i].feedback = res[i].msg;
							draft.card[i].validity = "is-invalid";
						}
						else{
							draft.card[i].feedback = null;
							draft.card[i].validity = '';
						}
					}				
				})
			);
			return;
		}

        console.log(this.state);
		console.log(bookingInfo);

        let formData = {};
        formData["userId"] = getUserInfoField("id");
        formData["roomId"] = bookingInfo.roomId;
        formData["startDate"] = bookingInfo.startDate;
        formData["endDate"] = bookingInfo.endDate;
        formData["occupants"] = Number(bookingInfo.adults) + Number(bookingInfo.children);

        console.log("form data: ");;
        console.log(formData);
        console.log("---------------");
		
		if(!window.confirm(`Ολοκλήρωση κράτησης;`)) return;

		
        axios.post(
            "http://localhost:8765/app/api/book",
            qs.stringify(formData),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            console.log(result);
            if (!result.data.success)
            {
				console.log(result.data.message);
				window.scrollTo(0, 0);
				this.setState(
					produce( draft => {
						draft.alert.message = "Δωμάτιο μη διαθέσιμο";
						draft.alert.visible = true;
					})
				)
            }
            else
            {        
                this.setState(
					produce( draft => {
						draft.roomName = bookingInfo.roomName;
					})
				)
            }
        })
        .catch((err) => {
			console.log(err);
			//window.scrollTo(0, 0);
			// this.setState(
			// 	produce( draft => {
			// 		draft.alert.message = err;
			// 		draft.alert.visible = true;
			// 	})
			// );
        })
        
	}
	
	onDismiss = () => {
		this.setState(
			produce( draft => {
				draft.alert.visible = false;
			})
		)
	}

    render(){

        const bookingInfo = getQueryParams(this.props.location.search);
        console.log("[Checkout.js] Rendering. Received query params: ");
        console.log(bookingInfo);
        console.log("---------");;

		if(this.state.roomName){
			return (
				<BookSuccess 
					roomName={this.state.roomName}
					amount={bookingInfo.price}
					date={this.todayIs()}
				/>
			);
		}
		else{
			return(
				<Container fluid id={classes.content}>
					<Row className="justify-content-center">
						<Alert 
								color="danger" 
								isOpen={this.state.alert.visible} 
								toggle={() => (this.onDismiss())}
						>
							{this.state.alert.message}
						</Alert>
					</Row>
					<Row className="justify-content-center">	
										
						<Col xs="auto" lg="6" xl="4">						
							<Card >
								<CardHeader >
									<Row className="d-flex justify-content-center">
										<Header>
											Ενοικίαση Δωματίου
										</Header>
									</Row>
								</CardHeader>
	
								<CardBody>
									<Form onSubmit={(event) => this.submitForm(event, bookingInfo)}>
										<br/>
										<Row className="d-flex justify-content-center">
											<Header>
												Πληροφορίες κράτησης:
											</Header>
										</Row>
										<br/>
										<Row>										
											<Col>
												<MyInput readOnly
													name='Δωμάτιο:'
													type='text'
													value={bookingInfo.roomName}
												/>
											</Col>
											<Col>
												<MyInput readOnly
													name='Ιδιοκτήτης:'
													type='text'
													value={bookingInfo.providername}
												/>
											</Col>
										</Row>
										<Row>										
											<Col>
												<MyInput readOnly
													name='Από:'
													type='date'
													value={bookingInfo.startDate}
												/>
											</Col>
											<Col>
												<MyInput readOnly
													name='Εώς:'
													type='date'
													value={bookingInfo.endDate}
												/>
											</Col>
										</Row>
										<Row>										
											<Col>
												<MyInput readOnly
													name='Ενήλικες:'
													type='text'
													value={bookingInfo.adults}
												/>
											</Col>
											<Col>
												<MyInput readOnly
													name='Παιδιά:'
													type='text'
													value={bookingInfo.children}
												/>
											</Col>
										</Row>
										<Row>	
											<Col>
												<MyInput readOnly
													name='Τοποθεσία:'
													type='text'
													value={bookingInfo.cityname}
												/>
											</Col>									
											<Col>
												<MyInput readOnly
													name='Τιμή:'
													type='text'
													value={bookingInfo.price+"€"}
												/>
											</Col>
										</Row>
										<hr/>
										<br/>	
										<Row className="d-flex justify-content-center">							
											<Header>
												Πιστωτική κάρτα:
											</Header>
										</Row>
										<br/>
										<Row>
											<Col>
												<MyInput
													name='ID:'
													type='text'
													placeholder="π.χ. 1111222233334444"
													value={this.state.card.id.value}
													feedback={this.state.card.id.feedback}
													validity={this.state.card.id.validity}
													changed={this.handleCardId.bind(this)}
												
												/>	
											</Col>
											<Col>
												<MyInput
													name="Αρ.Ασφαλείας:"
													type="text"
													placeholder="π.χ. 123"
													value={this.state.card.csc.value}
													feedback={this.state.card.csc.feedback}
													validity={this.state.card.csc.validity}
													changed={this.handleCSC.bind(this)}
												/>
											</Col>
										</Row>
										<br/>
										<Row>
											<Col>
												
	
												<FormGroup>
													<Label className="font-weight-bold small">Τύπος Κάρτας:</Label>
													<InputGroupButtonDropdown 
														addonType="append"  
														isOpen={this.state.dropdownOpen} 
														toggle={this.toggleDropDown}
													>
													<DropdownToggle caret >
															{this.state.card.type}
													</DropdownToggle>
													<DropdownMenu>
														<DropdownItem 
															className="d-flex align-items-center"
															onClick={this.handleCardType.bind(this,'Visa')}>
	
															Visa
														</DropdownItem>
	
														<DropdownItem divider />
	
														<DropdownItem 
															className="d-flex align-items-center"
															onClick={this.handleCardType.bind(this,'Mastercard')}>
	
															Mastercard
														</DropdownItem>
														
														<DropdownItem divider />
														<DropdownItem 
															className="d-flex align-items-center" 
															onClick={this.handleCardType.bind(this,'Diners')}>
	
															Diners
														</DropdownItem>
													</DropdownMenu>
													</InputGroupButtonDropdown>
												</FormGroup>
	
											</Col>
											<br/>
											<Col>
												<MyInput
													name="Ημερομηνία λήξης:"
													type="date"
													min={this.todayIs()}
													value={this.state.card.expdate.value}
													feedback={this.state.card.expdate.feedback}
													validity={this.state.card.expdate.validity}
													changed={this.handleCardExpdate.bind(this)}
												/>
											</Col>
										</Row>							
										<br/>
										<br/>
										<Row>
											<Col/>
											<Col>
												<SubmitBtn>
													Κράτηση
												</SubmitBtn>
											</Col>
											<Col/>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			);
		}
        
    }


}

export default withRouter(Checkout);