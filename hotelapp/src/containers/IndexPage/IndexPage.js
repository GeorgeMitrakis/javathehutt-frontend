import React from 'react';
import { Route } from 'react-router-dom';
import classes from './IndexPage.module.css';
import { Row } from 'reactstrap';

import SearchForm from '../SearchForm/SearchForm';

class IndexPage extends React.Component {

    render() {
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

            

            </>
  
        );
    }

}

export default IndexPage;
