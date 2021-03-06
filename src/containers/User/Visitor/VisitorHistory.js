import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Container, Card } from 'reactstrap';
import produce from 'immer';
import classes from './Visitor.module.css';
import Header from '../../../components/UI/Header/Header';
import { getUserInfo } from '../../../Utility/Utility';

class VisitorHistory extends Component {
	constructor(props){
		super(props);
		this.state = {
			transactions:[]
		}
	}

	componentDidMount(){
		Axios.get(
			"http://localhost:8765/app/api/book",
			{
				params:{
					visitorId: getUserInfo('userInfo').id
				}
			},			
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		)
		.then((result) => {
			if(result.data.success){
				console.log(result.data);
				console.log(result.data.data);
				this.setState(
					produce( draft => {
						draft.transactions = result.data.data.transactions;
					})
				);
			}
			else{
				console.log(result.data.message+".then()");
				console.log(result);
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

    render() {
        return (
			<Container fluid id={classes.history_card}>
			<Row className="d-flex justify-content-center">
				<Header>
					Ιστορικό κρατήσεων:
				</Header>
			</Row>
			<br/>
			<Card >
				<br/>
				<Row className="d-flex justify-content-around" >
					<Col xs="auto" md="auto"  >
						<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >ID</Row>
						<hr/>
						{this.state.transactions.map((t) => {
					return (
							<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
								{"#"+t.id}
							</Row>
					)
					})}
					</Col>
					<Col xs="auto" md="auto"  >
						<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >Δωμάτιο</Row>
						<hr/>
						{this.state.transactions.map((t) => {
					return (
							<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
								{"#"+t.roomId}
							</Row>
					)
					})}
					</Col>

					<Col xs="auto" md="auto"  >
						<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >Από:</Row>
						<hr/>
						{this.state.transactions.map((t) => {
					return (
							<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
								{t.startDate}
							</Row>
					)
					})}
					</Col>

					<Col xs="auto" md="auto"  >
						<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >Έως:</Row>
						<hr/>
						{this.state.transactions.map((t) => {
					return (
							<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
								{t.endDate}
							</Row>
					)
					})}
					</Col>

					<Col xs="auto" md="auto"  >
						<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >Κόστος:</Row>
						<hr/>
						{this.state.transactions.map((t) => {
					return (
							<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
								{t.cost+"€"}
							</Row>
					)
					})}
					</Col>

					<Col  xs="auto" md="auto"  >
						<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >Άτομα:</Row>
						<hr/>
						{this.state.transactions.map((t) => {
					return (
							<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
								{t.occupants}
							</Row>
					)
					})}
					</Col>
				</Row>
			</Card>
		</Container>
  
        );
    }
}

export default VisitorHistory;