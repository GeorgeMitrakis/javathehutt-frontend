import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import SearchResult from '../../components/UI/SearchResult/SearchResult';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

import styles from './SearchResults.module.css';
import { Get, Post } from 'react-axios';
import { createQueryParams, getQueryParams } from '../../Utility/Utility';
import SearchForm from '../SearchForm/SearchForm';
import FiltersTab from '../Filters/FiltersTab'
import GoogleMapReact from 'google-map-react';

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
            <Container fluid className={styles['results_container']}>
                <Row>
                    <Col sm="10">
                        <Row className="justify-content-center" >
                            <SearchForm className={styles['search_border']}/>
                        </Row>
                    </Col>

                    <Col sm="2">                    
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDzbz3N1cN0rLnP3WVa2lSkDWJ8uSIj2pA" }}
                            defaultCenter={{
                                lat: 59.95,
                                lng: 30.33
                            }}
                            defaultZoom={11}
                        >
                        <p> "My Marker" </p>
                            
                        </GoogleMapReact>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col sm={3}>
                        <Row>
                            <FiltersTab />
                        </Row>

                        <Row className="mt-3 mb-3" style={{height: "250px"}}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyDzbz3N1cN0rLnP3WVa2lSkDWJ8uSIj2pA" }}
                                defaultCenter={{
                                    lat: 59.95,
                                    lng: 30.33
                                }}
                                defaultZoom={11}
                            >
                            <p> "My Marker" </p>
                                
                            </GoogleMapReact>
                        </Row>
                    </Col>

                    <Col sm={9}>
                    <Get url="http://localhost:8765/app/api/search" params={{field: "rooms"}}>
                            {(error, response, isLoading, makeRequest, axios) => {
                                if(error) {
                                    return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                                }
                                else if(isLoading) {
                                    return (<div>Loading...</div>)
                                }
                                else if(response !== null) {
                                    console.log(response);
                                    const rooms = response.data.data.results.map( room =>
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

                        {/* EINAI TO REQUEST GIA TO DUMMY */}
                        {/* <Get url="http://localhost:8765/app/api/dummy" params={{field: "rooms"}}>
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
                        </Get> */}
                    </Col>
                </Row>
            </Container> 

        );
    }

}


export default withRouter(SearchResults);