import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
//import produce from 'immer';
import SearchResult from '../../components/SearchResult/SearchResult';
import { Container, Col, Row } from 'reactstrap';

import styles from './SearchResults.module.css';
import { Get, Post } from 'react-axios';
import { createQueryParams, getQueryParams, todayIs, tomorrowIs, isLegitDate, cmpDates } from '../../Utility/Utility';
import SearchForm from '../SearchForm/SearchForm';
import FiltersTab from '../../components/Filters/FiltersTab';
import GoogleMapReact from 'google-map-react';


const searchFiltersDefaults = {
    minPrice: 0,
    maxPrice: 100,
    maxDist: 100,
    searchText: "", 
    facilities: {
        breakfast: false,
        wifi: false,
        pool: false,
        sauna: false
    }
}

const searchInfoDefaults = {
    destination: "",
    fromDate: todayIs(),
    toDate: tomorrowIs(),
    rooms: 1,
    adults: 1,
    children: 0
}

const numSearchInfo = ["rooms", "adults", "children"];
const datesSearchInfo = ["fromDate", "toDate"];


class SearchResults extends React.Component {
    
    // state = {
    //     priceRange: [0, 100],
    //     areaRange: 100,
    //     searchText: "",
    //     facilities: {
    //         breakfast: false,
    //         wifi: false,
    //         pool: false,
    //         sauna: false
    //     }
    // }

    getSearchInfo = (queryParams) => {
        let searchInfo = {};
        Object.keys(searchInfoDefaults).forEach(filterId => { 
            // if (filterId === "destination") 
            // {
            //     if ((!queryParams["destination"]) || (queryParams["destination"] === ""))
            //     {
            //         this.props.history.goBack();
            //         return;
            //     }
            // }

            let setDefaultVal = true;
            if (queryParams[filterId])
            {
                if (numSearchInfo.includes(filterId) && !isNaN(queryParams[filterId]))
                {
                    if (queryParams[filterId] >= searchInfoDefaults[filterId])
                    {
                        searchInfo[filterId] = Number(queryParams[filterId]);
                        setDefaultVal = false;
                    }
                }
                else if (datesSearchInfo.includes(filterId) && isLegitDate(queryParams[filterId]))
                {
                    if (cmpDates(queryParams[filterId], searchInfoDefaults[filterId]) >= 0)
                    {
                        searchInfo[filterId] = queryParams[filterId];
                        setDefaultVal = false;
                    }
                }
                else if (filterId === "destination")
                {
                    searchInfo[filterId] = queryParams[filterId];
                    setDefaultVal = false;
                }
                // else
                // {
                //     alert("TROLIA");
                //     alert(filterId);
                // }
            }

            if (setDefaultVal)
            {
                searchInfo[filterId] = searchInfoDefaults[filterId];
            }

        });

        if (cmpDates(searchInfo.fromDate, searchInfo.toDate) >= 0)
        {
            searchInfo.fromDate = searchInfoDefaults.fromDate;
            searchInfo.toDate = searchInfoDefaults.toDate;
        }

        return searchInfo;
    }
 
    getSearchFilters = (queryParams) => {
        let searchFilters = {};
        Object.keys(searchFiltersDefaults).forEach(filterId => { 

            if (filterId === "facilities")
            {
                let facilities = {}
                Object.keys(searchFiltersDefaults.facilities).forEach(facId => {
                    if (queryParams[facId])
                    {
                        facilities[facId] = queryParams[facId] === "true";
                    }
                    else
                    {
                        facilities[facId] = searchFiltersDefaults.facilities[facId];
                    }
                });
                searchFilters["facilities"] = facilities;
            }
            else
            {
                if ((queryParams[filterId]) && (!isNaN(queryParams[filterId])) && (queryParams[filterId] >=0 ))
                {
                    searchFilters[filterId] = Number(queryParams[filterId]);
                }
                else
                {
                    searchFilters[filterId] = searchFiltersDefaults[filterId];
                }
            }

        });

        if (searchFilters.minPrice > searchFilters.maxPrice) 
        {
            searchFilters.minPrice = searchFiltersDefaults.minPrice;
            searchFilters.maxPrice = searchFiltersDefaults.maxPrice;
        }

        return searchFilters;
    }

    bookRoomHandler = (event, roomInfo, searchFilters, searchInfo) => {
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
            // alert("Πρέπει να είστε συνδεδεμένοι για να κάνετε κράτηση δωματίων.")
            this.props.history.push("/login");
        }
        
    }

    updateURL = (searchFilters, searchInfo) => {
        let params = { 
            ...searchInfo,
            ...searchFilters,
            ...searchFilters.facilities 
        };

        delete params.facilities;

        const queryParams = createQueryParams(params);
        this.props.history.push("/searchresults?" + queryParams);
    }

    handleSearchText = (event, searchFilters, searchInfo) => {
        const text = event.target.value;

        // this.setState(
        //     produce(draft => {
        //         draft.searchText = text;//this happens because event.target is not visible from draft
        //     })
        // );

        searchFilters.searchText = text;
        console.log("changed searchText", searchFilters);
        this.updateURL(searchFilters, searchInfo);
    }

    searchCritics = () => {
        // console.log("Αναζητηση Critics");
        // console.log(this.state);
        //axios request to send the search input
    }

    handlecheckBoxChange = (label, searchFilters, searchInfo) => {
        console.log("[FiltersTab.js]");
        console.log("Allakse kati se checkbox sto " + label);
    
        // let facilitiesChanged = this.state.facilities;
        // facilitiesChanged[label] = !this.state.facilities[label];
        // this.setState({
        //     facilities: facilitiesChanged
        // });

        // const checkboxValue = event.target.value;

        // this.setState(
        //     produce(draft => {
		// 		draft.facilities[label] = !draft.facilities[label];
		// 	})
		// );
        // console.log("Meta thn allagh sto checkbox " + " " + this.state.facilities[label]);
        //axios request to send the search input

        searchFilters.facilities[label] = !searchFilters.facilities[label];
        console.log(searchFilters);
        this.updateURL(searchFilters, searchInfo);
    }

    handlePriceRangeChange = (value, searchFilters, searchInfo) => {
		console.log("Allakse to PRICE!!!");
		// console.log(value);
        // this.setState(
        //     produce(draft => {
		// 		draft.priceRange = value;
		// 	})
		// );
        // console.log(this.state.priceRange);
        //axios request to send the search input

        searchFilters.minPrice = value[0];
        searchFilters.maxPrice = value[1];
        console.log(searchFilters);
        this.updateURL(searchFilters, searchInfo);
    };
    
    handleAreaRangeChange = (value, searchFilters, searchInfo) => {
        console.log("Allakse to AREA!!!");
		// console.log(value);
        // this.setState(
        //     produce(draft => {
		// 		draft.areaRange = value;
		// 	})
		// );
        // console.log(this.areaRange);
        //axios request to send the search input

        searchFilters.maxDist = value;
        console.log(searchFilters);
        this.updateURL(searchFilters, searchInfo);
    };

    render() {
        const queryParams = getQueryParams(this.props.location.search);
        console.log("[SearchResults.js] Rendering. Received queryParams:");
        console.log(queryParams);
        console.log("--------------");

        const searchFilters = this.getSearchFilters(queryParams);
        console.log("searchFilters", searchFilters);

        const searchInfo = this.getSearchInfo(queryParams);
        console.log("searchInfo", searchInfo);

        // console.log("tomorrow is: ", tomorrowIs());

        // console.log("state: ", this.state);

        return (
            <Container fluid className={styles['results_container']}>
                <Row>
                    <Col sm="10">
                        <Row className="justify-content-center" >
                            <SearchForm searchInfo={searchInfo} searchFilters={searchFilters} className={styles['search_border']}/>
                        </Row>
                    </Col>

                    <Col sm="2">                    
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDzbz3N1cN0rLnP3WVa2lSkDWJ8uSIj2pA" }}
                            defaultCenter={{
                                lat: 53.430957,
                                lng: -2.960476
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

                                searchFilters = {searchFilters}
                                searchInfo = {searchInfo}
                                // facilitiesFlags = {searchFilters.facilities}
                                // priceRange = {[searchFilters.minPrice, searchFilters.maxPrice]}
                                // areaRange = {searchFilters.maxDist}
                                // searchText = {searchFilters.searchText}
                            />
                        </Row>

                        <Row className="mt-3 mb-3" style={{height: "250px"}}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyDzbz3N1cN0rLnP3WVa2lSkDWJ8uSIj2pA" }}
                                defaultCenter={{
                                    lat: 53.430957,
                                    lng: -2.960476
                                }}
                                defaultZoom={11}
                            >
                            <p> "My Marker" </p>
                                
                            </GoogleMapReact>
                        </Row>
                    </Col>

                    <Col sm={9}>
                        
                         
                    {/* <Get url="http://localhost:8765/app/api/search" params={{minPrice: searchFilters.minPrice,
                                                                            maxPrice: searchFilters.maxPrice,
                                                                            maxDist: searchFilters.maxDist,
                                                                            hasPool: searchFilters.facilities.pool,
                                                                            hasWifi: searchFilters.facilities.wifi,
                                                                            hasShauna: searchFilters.facilities.sauna,
                                                                            cityName: searchInfo.destination,
                                                                            people: searchInfo.adults,
                                                                            pointX: 53.430957,
                                                                            pointY: -2.960476}}>
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
                                            bookRoomHandler={( event ) => this.bookRoomHandler( event, room, searchFilters, searchInfo )} 
                                        />
                                    );
                                    return rooms;
                                }

                                return null;
                            }}
                        </Get> */}

                        {/* EINAI TO REQUEST GIA TO DUMMY */}
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
                    </Col>
                </Row>
            </Container> 

        );
    }

}


export default withRouter(SearchResults);