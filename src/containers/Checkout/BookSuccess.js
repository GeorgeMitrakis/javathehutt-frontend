import React, {Component} from 'react';
import classes from './Checkout.module.css'
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Card, CardHeader, CardBody, Button} from 'reactstrap';

class BookSuccess extends Component{
	// constructor(props){
	// 	super(props);
	// }

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	clickHandler = (event) => {
		event.preventDefault();
		this.props.history.replace("/");
	}

	render(){
		return(
			<Container fluid id={classes.content} className="mt-5">
				<Row className="justify-content-center">
					<Col xs="auto" md="auto" lg="auto" xl="auto">
						<Card>
							<CardHeader  xs="auto">
								<Col className=" p-0">
									Η συναλλαγή ολοκληρώθηκε με επιτυχία!
								</Col>
							</CardHeader>
							<CardBody>
								<Col>
									<Row>
										<Col className=" p-0" xs="auto" md="auto" lg="auto" xl="auto">Δωμάτιο:</Col> 
										<Col className="text-right p-0">{this.props.roomName}</Col>										
									</Row>
									<hr/>
									<Row>
										<Col className=" p-0" xs="auto" md="auto" lg="auto" xl="auto">Ημερομηνία:</Col> 
										<Col className="text-right p-0">{this.props.date}</Col> 
									</Row>
									<hr/>
									<Row>
										<Col className=" p-0" xs="auto" md="auto" lg="auto" xl="auto">Ποσό:</Col> 
										<Col className="text-right p-0">{this.props.amount+"€"}</Col> 
									</Row>
								</Col>
							</CardBody>
						</Card>
						<br/>
						<Row className="d-flex justify-content-center" xs="auto">
							<Button 
								size="sm"
								color="info"
								xs="auto" lg="3" xl="3"
								onClick={(event) => this.clickHandler(event)}
								>
								Επιστροφή στην Αρχική
							</Button>
						</Row>
					</Col>
				</Row>
				
			</Container>
		);
	}
		
	
}

export default withRouter(BookSuccess);