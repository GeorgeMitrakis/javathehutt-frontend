import React from 'react';
import Axios from 'axios';
// import { Route } from 'react-router-dom';

// import classes from './Administration.module.css';
import { Row, Col, Container, CardHeader } from 'reactstrap';
// import Button from 'reactstrap/lib/Button';
import produce from 'immer';

class Transactions extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
			transactions:[],
			profit:0
		}
    }

	getTransactions(){
		Axios.get(
			"http://localhost:8765/app/api/book",			
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		)
		.then((result) => {
			if(result.data.success){
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

	getProfit(){
		Axios.get(
			"http://localhost:8765/app/api/admin",			
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
						draft.profit = result.data.data.profit;
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

	componentDidMount(){
		this.getTransactions();
		this.getProfit();
	}

    render() {
        return (
			<Container>
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
					<Row className="d-flex justify-content-center"   xs="auto" md="auto"  >Πελάτης</Row>
					<hr/>
					{this.state.transactions.map((t) => {
				   return (
						<Row key={t.id} className="d-flex justify-content-center"   xs="auto" md="auto"  >
							{"#"+t.visitorId}
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
			<Row className="mt-5"/>
			<Row className="d-flex justify-content-center">
				<CardHeader>
					Συνολικό κέρδος:{' '+this.state.profit+"€"}
				</CardHeader>
				
			</Row>
			<Row className="mb-5"/>
			</Container>
  
        );
    }

}

export default Transactions;
