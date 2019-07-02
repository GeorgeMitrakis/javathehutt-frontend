import React, { Component } from 'react';
import produce from 'immer';
import { withRouter } from 'react-router-dom';
import Header from '../../components/UI/Header/Header';
import MyInput from '../../components/UI/MyInput/MyInput';
import { Row, Col, Form, FormGroup, Container, Label,
    Input, InputGroup, InputGroupText, 
	InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Alert} from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import classes from './Checkout.module.css';
import axios from 'axios';
import { getQueryParams, getUserInfoField } from '../../Utility/Utility';
import qs from "querystring";
import BookSuccess from './BookSuccess';
//http://localhost:3000/book?hotel_id=123456&id=26&providerId=5&locationId=29&price=16&capacity=2&wifi=true&pool=true&shauna=false&roomName=superrooa&description=just%20adding%20test%20rooms&location=%5Bobject%20Object%5D&maxOccupants=3&provider=%5Bobject%20Object%5D&destination=a&fromDate=2019-07-02&toDate=2019-07-03&rooms=1&adults=1&children=0

class Checkout extends Component{

    constructor(props){
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state={
            dropdownOpen: false,
            room: {
                name: null,
                price: null
            },
            card: {
                id: null,
                expdate: null,
                csc: null,
                type: "Visa",
			},
			transactionId: null,
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
        this.setState(
            produce(draft => {
                draft.card.id = id;
            })
        );
    }

    handleCSC(event){
        let csc=event.target.value;
        this.setState(
            produce(draft => {
                draft.card.csc = csc;
            })
        );
    }

    handleCardExpdate(event){
        let expdate=event.target.value;
        this.setState(
            produce(draft => {
                draft.card.expdate = expdate;
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
        console.log(this.state);
        console.log(bookingInfo);

        let formData = {};
        formData["userId"] = getUserInfoField("id");
        formData["roomId"] = bookingInfo.id;
        formData["startDate"] = bookingInfo.fromDate;
        formData["endDate"] = bookingInfo.toDate;
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
						draft.alert.message = result.data.message;
						draft.alert.visible = true;
					})
				)
            }
            else
            {        
                this.setState(
					produce( draft => {
						draft.transactionId = result.data.data.transactionId;
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

		if(this.state.transactionId){
			return (
				<BookSuccess 
					transactionId={this.state.transactionId}
					amount={bookingInfo.price*bookingInfo.rooms}
					date={this.todayIs()}
				/>
			);
		}
		else{
			return(
				<Container fluid id={classes.content}>
					<Row className="justify-content-center">					
						<Col xs="auto" lg="6" xl="4">
						<Alert 
							color="danger" 
							isOpen={this.state.alert.visible} 
							toggle={() => (this.onDismiss())}
						>
							{this.state.alert.message}
						</Alert>
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
													name='Τοποθεσία:'
													type='text'
													value={bookingInfo.destination}
												/>
											</Col>
										</Row>
										<Row>										
											<Col>
												<MyInput readOnly
													name='Από:'
													type='date'
													value={bookingInfo.fromDate}
												/>
											</Col>
											<Col>
												<MyInput readOnly
													name='Εώς:'
													type='date'
													value={bookingInfo.toDate}
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
													name='Αριθμός δωματίων:'
													type='text'
													value={bookingInfo.rooms}
												/>
											</Col>
											<Col>
												<MyInput readOnly
													name='Τιμή:'
													type='text'
													value={
														bookingInfo.price+"€ X "+bookingInfo.rooms+" = "
														+bookingInfo.price*bookingInfo.rooms+"€"
													}
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
													placeholder="1111222233334444"
													changed={this.handleCardId.bind(this)}
												
												/>	
											</Col>
											<Col>
												<MyInput
														name="Αρ.Ασφαλείας:"
														type="text"
														placeholder="123"
														onChange={this.handleCSC.bind(this)}
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
													onChange={this.handleCardExpdate.bind(this)}
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