import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './IndexPage.module.css';
import { Row } from 'reactstrap';

import SearchForm from '../SearchForm/SearchForm';
// import Login from '../Login/Login';

// import Signup from '../Signup/Signup';
import Venice from '../../assets/images/venice_sunrise-wallpaper-5120x3200.jpg'
class IndexPage extends React.Component {

    

    render() {

        console.log("Rendering Index Page");
        console.log(this.props);

        return (
            <>
            <div className="d-flex align-items-start justify-content-center" id={classes.content}>
                <div>

                    <Row className="justify-content-center">
                        <h1 className="font-weight-bold"> <span style={{color:"blue"}}>Java</span><span style={{color:"orange"}}>The</span><span style={{color:"red"}}>Hutt</span></h1>
                    </Row>

                    <Row className="justify-content-center">
                        <h2 className="font-weight-bold"> Έλα να <a href={"https://www.youtube.com/watch?v=rwmonzAiQ3M"}>την</a> βρείς</h2>
                    </Row>

                    <Row className="justify-content-center mr-2 ml-2 mt-5">
                        <SearchForm/>
                    </Row>

                    <Row  className="justify-content-center mr-2 ml-2 mt-5">
                        <img style={{width: "95%", height: "45vh"}} src={Venice}/>
                    </Row>

                </div>
            </div>

            {/* <Switch>
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
            </Switch> */}

            
        

            </>
  
        );
    }

}

export default withRouter(IndexPage);
