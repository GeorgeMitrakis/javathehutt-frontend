import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import './App.css';
import { Container} from 'reactstrap';

import Layout from './hoc/Layout/Layout';
import IndexPage from './containers/IndexPage/IndexPage' ;

import Logout from './containers/Logout/Logout';



class App extends Component {

    state = {
        isAuth: localStorage.getItem('token') !== null
    }

    logIn = (authToken) => {
        localStorage.setItem('token', authToken);
        
        this.setState(
            produce(draft => {
                draft.isAuth = true;
            })
        );

        this.props.history.replace("/");
    }

    logOut = () => {
        localStorage.removeItem('token');
        
        this.setState(
            produce(draft => {
                draft.isAuth = false;
            })
        );

        this.props.history.replace("/");
    }

    render () {

        let routes = (
            <Switch>
                <Route 
                    path={ ["/", "/login", '/signup'] } 
                    exact
                    render={() => ( <IndexPage logIn={this.logIn} />)}
                />
                <Redirect to="/" />
            </Switch>
        );

        if (this.state.isAuth)
        {
            routes = (
                <Switch>
                    <Route 
                        path="/logout" 
                        exact
                        render={() => ( <Logout logOut={this.logOut}/> )}
                    />

                    <Route 
                        path="/" 
                        exact
                        render={() => ( <IndexPage logIn={this.logIn} />)}
                    />

                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <Container fluid className="App">
                <Layout isAuth={this.state.isAuth}>
                    {routes}
                </Layout>
            </Container>
        );

  }

}

export default withRouter(App);
