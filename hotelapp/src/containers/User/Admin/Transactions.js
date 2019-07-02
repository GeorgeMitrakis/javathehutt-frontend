import React from 'react';
import Axios from 'axios';
// import { Route } from 'react-router-dom';

// import classes from './Administration.module.css';
import { Row, Col } from 'reactstrap';
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
            <Col>
				<br/>
				<Row xs="auto" md="auto" lg="auto" xl="auto">
					<Col className="d-flex justify-content-center p-0" >Πελάτης</Col>
					<Col className="d-flex justify-content-centerp-0" >Δωμάτιο</Col>
					<Col className="d-flex justify-content-center" >Από:</Col>
					<Col className="d-flex justify-content-center" >Έως:</Col>
					<Col className="d-flex justify-content-center p-0" >Κόστος:</Col>
					<Col className="d-flex justify-content-center p-0" >Άτομα:</Col>
				</Row>
               {this.state.transactions.map((t) => {
				   return (
					   <div key={t.id}>
					   <hr/>
					   <Row xs="auto" md="auto" lg="auto" xl="auto">
						   <Col className="d-flex justify-content-center" >{"#"+t.visitorId}</Col>
						   <Col className="d-flex justify-content-center" >{"#"+t.roomId}</Col>
						   <Col className="d-flex justify-content-center" >{t.startDate}</Col>
						   <Col className="d-flex justify-content-center" >{t.endDate}</Col>
						   <Col className="d-flex justify-content-center" >{t.cost+"€"}</Col>
						   <Col className="d-flex justify-content-center" >{t.occupants}</Col>
					   </Row>
					   </div>
				   )
			   }) }
            </Col>
  
        );
    }

}

export default Transactions;
