import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import classes from './Administration.module.css';

import { Card, Row, Col, Alert } from 'reactstrap';
import Header from '../../../components/UI/Header/Header';
import produce from 'immer';
import NavigationItem from '../../../components/Navigation/NavigationItem/NavigationItem'
import UserView from './UserView'
import Transactions from './Transactions'



//import SearchForm from '../SearchForm/SearchForm';
//import Login from '../Login/Login';
//import Signup from '../Signup/Signup';

class Administration extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
            activeTab: 'usersTab',
			alert:{
				visible: false,
				message:''
			}
        };
        
        
    }
    
    tabChanged(e){
        const id = e.target.id;
        
        this.setState(
            produce(draft => {
                draft.activeTab = id;
            })
        );
        
	}

	onAlert = (message) => {
		this.setState(
			produce(draft =>{
				//draft.alert.message = "Ο χρήστης με email :\""+u.email+"\" πήρε σφυράκι!";
				draft.alert.message = message;
				draft.alert.visible = true;
			})
		)	
	}
	
	onDismiss = () => {
		this.setState(
			produce( draft => {
				draft.alert.visible = false;
			})
		)
	}

    render() {       
        return (
			<div id={classes.content} className="h-100 col-lg-8 offset-lg-2">

				
				<Row className="justify-content-center mt-5 mb-5" > 				
					<Header>Διαχείριση Πλατφόρμας</Header>
				</Row>
				<Row className="justify-content-center">
					<Alert color="success" isOpen={this.state.alert.visible} toggle={() => (this.onDismiss())}>
						{this.state.alert.message}
					</Alert>
				</Row>
				<Row id={classes.tabs}>

						<Col className="col-lg-3 offset-lg-3">
							<span  onClick={this.tabChanged.bind(this)}>
								<NavigationItem  isActive={(this.state.activeTab === 'usersTab')} customid="usersTab" link="/admin/administration/userview"> Χρηστες </NavigationItem>
							</span>
						</Col>
						
						<Col className="col-lg-3">
							<span onClick={this.tabChanged.bind(this)} >
								<NavigationItem  isActive={this.state.activeTab === 'transactionsTab'} customid="transactionsTab" link="/admin/administration/transactions" > Συναλλαγες</NavigationItem>
							</span>
						</Col>
						
						
				</Row>
	
				<Card outline color="secondary" className="bg-light scrollbar h-75" id={classes.frame}>
					<Switch>
						<Route path="/admin/administration/userview" render={() => <UserView alert={this.onAlert} dismiss={this.onDismiss}/>} />
						<Route path="/admin/administration/transactions" component={Transactions} />
						<Redirect to="/admin/administration/userview" />
					</Switch>
				</Card>				
			</div>
  
        );
    }

}

export default Administration;
