import React from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './Administration.module.css';

import { Container, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import produce from 'immer';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem'
import UserView from './UserView'
import Transactions from './Transactions'



//import SearchForm from '../SearchForm/SearchForm';
//import Login from '../Login/Login';
//import Signup from '../Signup/Signup';

class Administration extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
            activeTab: 'usersTab'
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

    render() {       
        return (
			<div id={classes.content} className="h-100 col-lg-8 offset-lg-2">

				<Row className="justify-content-center" > 
					<h1 className="font-weight-bold">I AM THE SENATE!</h1>
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
						<Route path="/admin/administration/userview" component={UserView} />
						<Route path="/admin/administration/transactions" component={Transactions} />
						<Redirect to="/admin/administration/userview" />
					</Switch>
				</Card>				
			</div>
  
        );
    }

}

export default Administration;
