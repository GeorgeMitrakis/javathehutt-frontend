import React from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './Admin.module.css';
import { Row } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import produce from 'immer';

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
            
            <div className="d-flex align-items-start justify-content-center"  id={classes.content}> 
                <div>

                    <Row className="justify-content-center">
                        <h1 className="font-weight-bold">I AM THE SENATE!</h1>
                        {this.state.val}
                    </Row>



                    <Route path="/userview" component={UserView}>
                    </Route>
                    
                    {
                        this.state.tabs.map( t => {
                            return <button key={t.title} value={t.title} onClick={this.tabChanged.bind(this)}>{t.title}</button>
                        })
                    }

                    
                    {
                        this.state.tabs.map( t => {
                            return null;
                            return this.state.activeTab == t.title ? <div key="t.title">{t.comp}</div> : null
                        })
                    }
                                 
                </div>
            </div>


            </>
  
        );
    }

}

export default Admin;
