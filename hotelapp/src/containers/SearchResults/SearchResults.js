import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import Results from '../../components/UI/SearchResult/Results';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

import styles from './SearchResults.module.css';
import { Get } from 'react-axios';

class SearchResults extends React.Component {
    
    state = {

    }

    render() {
        return (
            <Container className={styles['results']}>
                <Get url="http://localhost:8765/app/api/dummy" params={{field: "rooms"}}>
                    {(error, response, isLoading, makeRequest, axios) => {
                        if(error) {
                            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                        }
                        else if(isLoading) {
                            return (<div>Loading...</div>)
                        }
                        else if(response !== null) {
                            console.log(response);
                            const rooms = response.data.map( room =>
                                <Results 
                                    key={room.id}
                                    details={room}
                                />
                            );
                            return rooms;
                        }
                        return null;
                    }}
                </Get>
            </Container>   
        );
    }

}


export default withRouter(SearchResults);