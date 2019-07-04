import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import './App.css';
import { Container} from 'reactstrap';

import Layout from './hoc/Layout/Layout';
import IndexPage from './containers/IndexPage/IndexPage' ;

import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Signup from './containers/Signup/Signup';

import Visitor from './components/User/Visitor/Visitor';
import Provider from './components/User/Provider/Provider';
import Admin from './components/User/Admin/Admin';

import SearchResults from'./containers/SearchResults/SearchResults';
import Checkout from './containers/Checkout/Checkout';

import { getUserInfoField } from './Utility/Utility';
import { getUserInfo } from './Utility/Utility';

import axios from 'axios';



class App extends Component {

    state = {
        isAuth: localStorage.getItem('token') !== null,
        role: getUserInfoField("role")
        //roles: null, visitor, provider, admin
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

        this.props.history.goBack();
	}
	
	adminRoutes = () => {
		return(
			<Switch>
				<Route
					path="/logout"
					exact
					render={() => ( <Logout logOut={this.logOut}/> )}
				/>

				<Route
					path={ ["/searchresults"] }
					exact
                    render={() => ( <SearchResults isAuth={this.state.isAuth}/>)}
				/>

				<Route
					path={ ["/hotel/:hotelname"] }
					exact
					render={() => ( null )}
				/>

				<Route
					path={ ["/book"] }
					exact
					render={() => ( <Checkout /> )}
				/>

				{/* <Route
					path={ ["/admin", "/admin/profile", "/admin/changepass", "/admin/administration", "/admin/administration/userview", "/admin/administration/transactions"] }
					exact
					render={() => ( <Admin/> )}
				/> */}

				<Route
					path={ ["/admin", "/admin/administration", "/admin/administration/userview", "/admin/administration/transactions"] }
					exact
					render={() => ( <Admin/> )}
				/>

				<Route
					path="/"
					exact
					render={() => ( <IndexPage/> )}
				/>

				<Redirect to="/" />
			</Switch>
		);
	}

	visitorRoutes = () => {
		return(
			<Switch>
				<Route 
					path="/logout" 
					exact
					render={() => ( <Logout logOut={this.logOut}/> )}
				/>

				<Route
					path={ ["/searchresults"] }
					exact
					render={() => ( <SearchResults isAuth={this.state.isAuth}/>)}                        /> )}
				/>

				<Route
					path={ ["/hotel/:hotelname"] }
					exact
					render={() => ( null )}
				/>

				<Route
					path={ ["/book"] }
					exact
					render={() => ( <Checkout/> )}
				/>

				<Route
					path={ ["/visitor", "/visitor/history", "/visitor/profile", "/visitor/changepass"] }
					exact
					render={() => ( <Visitor/> )}
				/>

				<Route 
					path="/" 
					exact
					render={() => ( <IndexPage/> )}
				/>

				<Redirect to="/" />
			</Switch>
		);
	}

	providerRoutes = () => {
		return(
			<Switch>
				<Route 
					path="/logout" 
					exact
					render={() => ( <Logout logOut={this.logOut}/> )}
				/>

				<Route
					path={ ["/searchresults"] }
					exact
					render={() => ( <SearchResults isAuth={this.state.isAuth}/>)}                        /> )}
				/>

				<Route
					path={ ["/hotel/:hotelname"] }
					exact
					render={() => ( null )}
				/>

				<Route
					path={ ["/book"] }
					exact
					render={() => ( <Checkout/> )}
				/>

				<Route
					path={ ["/provider", "/provider/myrooms", "/provider/history", "/provider/profile", "/provider/changepass"] }
					exact
					render={() => ( <Provider/> )}
				/>

				<Route 
					path="/" 
					exact
					render={() => ( <IndexPage/> )}
				/>

				<Redirect to="/" />
			</Switch>
		);
	}



	guestRoutes = () => {
		return(
            <Switch>
                <Route 
                    path="/" 
                    exact
                    render={() => ( <IndexPage/>)}
                />

                <Route 
                    path="/login" 
                    exact
                    render={() => ( <Login logIn={this.logIn} />)}
                />
                <Route 
                    path="/signup"
                    exact
                    render={() => ( <Signup logIn={this.logIn} />)}
                />


                <Route
                    path={ ["/searchresults"] }
                    exact
                    render={() => ( <SearchResults isAuth={this.state.isAuth}/>)}
                />

                <Route
                    path={ ["/hotel/:hotelname"] }
                    exact
                    render={() => ( null )}
                />

                <Redirect to="/" />
            </Switch>
        );
	}

	userRoutes = () =>{
		if(!this.state.isAuth){
			return this.guestRoutes();
		}
		else if(this.state.role === "admin"){
			return this.adminRoutes();
		}
		else if(this.state.role === "visitor"){
			return this.visitorRoutes();
		}
		else if(this.state.role === "provider"){
			return this.providerRoutes();
		}
		else{
			console.log("Something went terribly wrong");
			return this.guestRoutes();
		}
	}

    render () {

        //axios.defaults.baseURL = "http://localhost:8765/app/api/";
        axios.defaults.headers.common['token'] = localStorage.getItem('token');
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:8765/";

        //let routes = this.userRoutes();
        

        return (
            <Container fluid className="App">
                <Layout isAuth={this.state.isAuth} role={this.state.role}>
                    {this.userRoutes()}
                </Layout>
            </Container>
        );

    }

    componentDidMount() {
        console.log("[App.js] did mount");
        console.log("---state---");
        console.log(this.state);
        console.log("---userInfo---");
        console.log(getUserInfo());
        console.log("---authToken---");
        console.log(localStorage.getItem('token'));
    }

}

export default withRouter(App);
