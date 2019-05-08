import React from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './Admin.module.css';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import produce from 'immer';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem'
import UserView from './UserView'
import Transactions from './Transactions'



//import SearchForm from '../SearchForm/SearchForm';
//import Login from '../Login/Login';
//import Signup from '../Signup/Signup';

class Admin extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
            tabs:[
                {
                    'title':'Users',
                    'comp':<> <UserView></UserView> </>
                },
                {
                    'title':'Transactions',
                    'comp':<> <Transactions></Transactions> </>
                }
            
            ],
            activeTab: 'Users'
        };
        
        
    }
    
    tabChanged(e){
        this.state.activeTab = e.target.value;
        
    }

    render() {

        return (
            <>
            
                <div id={classes.content} className="h-75 col-lg-8 offset-lg-2">

                    <Row className="justify-content-center" > 
                        <h1 className="font-weight-bold">I AM THE SENATE!</h1>
                    </Row>
                
                    <Row id={classes.tabs}>
                        
                            <NavigationItem  link="/admin/userview"> Χρηστες </NavigationItem>
                            <NavigationItem link="/admin/transactions"> Συναλλαγες</NavigationItem>
                           
                    </Row>
                    
                    
                    <div className="container border border-dark h-75" id={classes.frame}>
                            <Switch>
                                <Route path="/admin/userview" component={UserView} />
                                <Route path="/admin/transactions" component={Transactions} />
                                <Redirect to="/admin/userview" />
                            </Switch>
                    </div>       
                                

                   
                </div>


            </>
  
        );
    }

}

export default Admin;
