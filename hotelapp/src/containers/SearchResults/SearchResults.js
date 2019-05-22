import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import SearchResult from '../../components/UI/SearchResult/SearchResult';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

import styles from './SearchResults.module.css';
import { Get } from 'react-axios';
import { createQueryParams, getQueryParams } from '../../Utility/Utility';
import SearchForm from '../SearchForm/SearchForm';


class SearchResults extends React.Component {
    
    state = {

    }

    bookRoomHandler = (event, roomInfo, searchInfo) => {
        // alert(roomID);        
        if(this.props.isAuth){
            const params = {
                hotel_id: "123456",
                ...roomInfo,
                ...searchInfo
            }
            const queryParams = createQueryParams(params);
            console.log("Inside SearchResults. About to redirect to: /book?" + queryParams);
            this.props.history.push("/book?" + queryParams);
        }
        else{
            alert("Πρέπει να είστε συνδεδεμένοι για να κάνετε κράτηση δωματίων.")
        }
        
    }

    render() {
        const queryParams = getQueryParams(this.props.location.search);
        console.log("[SearchResults.js] Rendering. Received queryParams:");
        console.log(queryParams);
        console.log("--------------");

        return (

            <Row className="content">
                <Col sm="3" className="border">
                    <SearchForm/>
                </Col>

                <Col sm="8" className="border">

                    <Container>
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
                                        <SearchResult 
                                            key={room.id}
                                            details={room}
                                            bookRoomHandler={( event ) => this.bookRoomHandler( event, room, queryParams )} 
                                        />
                                    );
                                    return rooms;
                                }
                                return null;
                            }}
                        </Get>
                    </Container> 
                </Col>

            </Row>
        );
    }

}


export default withRouter(SearchResults);