import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import './App.css';
import { Container} from 'reactstrap';
import Layout from './hoc/Layout/Layout';
import IndexPage from './containers/IndexPage/IndexPage' ;
import Logout from './containers/Logout/Logout';
import { getUserInfoField } from './Utility/Utility';


class App extends Component {

    state = {
        isAuth: localStorage.getItem('token') !== null,
        role: getUserInfoField("role") === null ? "visitor" : getUserInfoField("role")
        //roles: visitor, user (aka logged in visitor), provider, admin
    }

    logIn = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        
        this.setState(
            produce(draft => {
                draft.isAuth = true;
                draft.role = data.user.role;
            })
        );

        this.props.history.replace("/");
    }

    logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        this.setState(
            produce(draft => {
                draft.isAuth = false;
                draft.role = "visitor";
            })
        );

        this.props.history.replace("/");
    }

    render () {

        let routes = (
            <Switch>
                <Route 
                    path={ ["/", "/login", "/signup"] } 
                    exact
                    render={() => ( <IndexPage logIn={this.logIn} />)}
                />

                {/* <Route 
                    path={ ["/results"] } 
                    exact
                    render={() => ( <SearchResults logIn={this.logIn} />)}
                /> */}

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

                    {/* <Route 
                    path={ ["/results"] } 
                    exact
                    render={() => ( <SearchResults/> )}
                    /> */}

                    <Route 
                        path="/" 
                        exact
                        render={() => ( <IndexPage/> )}
                    />

                    <Redirect to="/" />
                </Switch>
            );

            if (this.state.role === "admin")
            {
                routes = (
                    <Switch>
                        <Route 
                            path="/logout" 
                            exact
                            render={() => ( <Logout logOut={this.logOut}/> )}
                        />
    
                        {/* <Route 
                        path={ ["/results"] } 
                        exact
                        render={() => ( <SearchResults/> )}
                        /> */}

                        {/* <Route 
                            path={ ["/admin", "/admin/users", "/admin/transactions"] } 
                            exact
                            render={() => ( <Admin/> )}
                        /> */}
    
                        <Route 
                            path="/" 
                            exact
                            render={() => ( <IndexPage/> )}
                        />
    
                        <Redirect to="/" />
                    </Switch>
                );
            }
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
