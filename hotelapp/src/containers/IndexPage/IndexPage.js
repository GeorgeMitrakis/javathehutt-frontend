import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import classes from './IndexPage.module.css';
import { Row } from 'reactstrap';

import SearchForm from '../SearchForm/SearchForm';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

class IndexPage extends React.Component {

    

    render() {

        console.log("Rendering Index Page");
        console.log(this.props);

        return (
            <>
            <div className="d-flex align-items-start justify-content-center" id={classes.content}>
                <div>

                    <Row className="justify-content-center">
                        <h1 className="font-weight-bold"> Hotel App Name</h1>
                    </Row>

                    <Row className="justify-content-center">
                        <h2 className="font-weight-bold"> Hotel App Slogan</h2>
                    </Row>

                    <Row className="justify-content-center mr-2 ml-2 mt-5">
                        <SearchForm/>
                    </Row>

                </div>
            </div>

            <Switch>
                <Route
                    path="/login"
                    exact
                    // component={Login}
                    render={() => ( <Login logIn={this.props.logIn}/> )}
                />

                <Route
                    path="/signup"
                    exact
                    // component={Signup}
                    render={() => ( <Signup logIn={this.props.logIn} />)}
                />
            </Switch>

            </>
  
        );
    }

}

export default withRouter(IndexPage);
