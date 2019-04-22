import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import './App.css';
import { Container} from 'reactstrap';

import Layout from './hoc/Layout/Layout';
import IndexPage from './containers/IndexPage/IndexPage' ;


class App extends Component {

    state = {
        isAuth: false
    }

    storeAuthToken = (authToken) => {
        localStorage.setItem('token', authToken);
        this.setState(
            produce(draft => {
                draft.isAuth = true;
            })
        );
    }

    deleteAuthToken = () => {
        localStorage.removeItem('token');
        this.setState(
            produce(draft => {
                draft.isAuth = false;
            })
        );
    }

    render () {

        let routes = (
            <Switch>
                <Route path="/" component={IndexPage} />
                <Redirect to="/" />
            </Switch>
        );

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
