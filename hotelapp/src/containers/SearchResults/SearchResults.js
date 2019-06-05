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
        priceRange: [0, 100],
        areaRange: 100,
        searchText: "",
        facilities: {
            breakfast: false,
            wifi: false,
            pool: false,
            sauna: false
        }
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

    handleSearchText = (event) => {
        const text = event.target.value;

        this.setState(
            produce(draft => {
                draft.searchText = text;//this happens because event.target is not visible from draft
            })
        );
    }

    searchCritics = () => {
        console.log("Αναζητηση Critics");
        console.log(this.state);
        //axios request to send the search input
    }

    handlecheckBoxChange = (label) => {
        console.log("[FiltersTab.js]");
        console.log("Allakse kati se checkbox sto " + label);
    
        // let facilitiesChanged = this.state.facilities;
        // facilitiesChanged[label] = !this.state.facilities[label];
        // this.setState({
        //     facilities: facilitiesChanged
        // });

        // const checkboxValue = event.target.value;

        this.setState(
            produce(draft => {
				draft.facilities[label] = !draft.facilities[label];
			})
		);
        console.log("Meta thn allagh sto checkbox " + " " + this.state.facilities[label]);
        //axios request to send the search input
    }

    handlePriceRangeChange = (value) => {
		console.log("Allakse to PRICE!!!");
		console.log(value);
        this.setState(
            produce(draft => {
				draft.priceRange = value;
			})
		);
        console.log(this.state.priceRange);
        //axios request to send the search input
    };
    
    handleAreaRangeChange = (value) => {
        console.log("Allakse to AREA!!!");
		console.log(value);
        this.setState(
            produce(draft => {
				draft.areaRange = value;
			})
		);
        console.log(this.areaRange);
        //axios request to send the search input
    };

    render() {
        const queryParams = getQueryParams(this.props.location.search);
        console.log("[SearchResults.js] Rendering. Received queryParams:");
        console.log(queryParams);
        console.log("--------------");

        console.log("state: ", this.state);

        return (
            <Container fluid className={styles['results_container']}>
                <Row>
                    <Col sm="10">
                        <Row className="justify-content-center" >
                            <SearchForm searchInfo={queryParams} className={styles['search_border']}/>
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
                            <FiltersTab 
                                handlePriceRangeChange = {this.handlePriceRangeChange}
                                handleAreaRangeChange = {this.handleAreaRangeChange}
                                handleSearchText = {this.handleSearchText}
                                handlecheckBoxChange = {this.handlecheckBoxChange}
                                facilitiesFlags = {this.state.facilities}
                                priceRange = {this.state.priceRange}
                                areaRange = {this.state.areaRange}
                                searchText = {this.state.searchText}
                            />
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
                        
                         
                    <Get url="http://localhost:8765/app/api/search" params={{minPrice: this.state.priceRange[0],
                                                                            maxPrice: this.state.priceRange[1],
                                                                            maxDist: this.state.areaRange,
                                                                            hasPool: this.state.facilities.pool,
                                                                            hasWifi: this.state.facilities.wifi,
                                                                            hasShauna: this.state.facilities.sauna,
                                                                            Name: queryParams.destination,
                                                                            pointX: 37.983810,
                                                                            pointY: 23.727539}}>
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