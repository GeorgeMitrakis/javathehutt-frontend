import React from 'react';
import Axios from 'axios';
// import { Route } from 'react-router-dom';

// import classes from './Administration.module.css';
import { Row, Col, Container } from 'reactstrap';
// import Button from 'reactstrap/lib/Button';
import produce from 'immer';

class Transactions extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
			transactions:[]
		}
    }

	componentDidMount(){
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

    render() {
        return (
            // <Col>
			// 	<br/>
			// 	<Row xs="auto" md="auto">
			// 		<Col className="d-flex justify-content-center" >Πελάτης</Col>
			// 		<Col className="d-flex justify-content-center" >Δωμάτιο</Col>
			// 		<Col className="d-flex justify-content-center" >Από:</Col>
			// 		<Col className="d-flex justify-content-center" >Έως:</Col>
			// 		<Col className="d-flex justify-content-center" >Κόστος:</Col>
			// 		<Col className="d-flex justify-content-center" >Άτομα:</Col>
			// 	</Row>
            //    {this.state.transactions.map((t) => {
			// 	   return (
			// 		   <Row  key={t.id} xs="auto" md="auto" >
			// 			   <Col className="d-flex justify-content-center" >{"#"+t.visitorId}</Col>
			// 			   <Col className="d-flex justify-content-center" >{"#"+t.roomId}</Col>
			// 			   <Col className="d-flex justify-content-center" >{t.startDate}</Col>
			// 			   <Col className="d-flex justify-content-center" >{t.endDate}</Col>
			// 			   <Col className="d-flex justify-content-center" >{t.cost+"€"}</Col>
			// 			   <Col className="d-flex justify-content-center" >{t.occupants}</Col>
			// 		   </Row>
			// 	   )
			//    }) }
			// </Col>
			<Container>
			<Row className="d-flex justify-content-around" >
				<Col xs="auto" md="auto"  >
					<Row className="d-flex justify-content-center"   xs="1" md="auto"  >ID</Row>
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
					<Row className="d-flex justify-content-center"   xs="1" md="auto"  >Πελάτης</Row>
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
					<Row className="d-flex justify-content-center"   xs="1" md="auto"  >Δωμάτιο</Row>
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
						<Row key={t.id} className="d-flex justify-content-center"   xs="1" md="auto"  >
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
						<Row key={t.id} className="d-flex justify-content-center"   xs="1" md="auto"  >
							{t.endDate}
						</Row>
				   )
				   })}
				</Col>

				<Col xs="auto" md="auto"  >
					<Row className="d-flex justify-content-center"   xs="1" md="auto"  >Κόστος:</Row>
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
					<Row className="d-flex justify-content-center"   xs="1" md="auto"  >Άτομα:</Row>
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
			</Container>
  
        );
    }

}

export default Transactions;
