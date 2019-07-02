
import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import SearchResult from '../SearchResult/SearchResult';
import { Get } from 'react-axios';
import { Row } from 'reactstrap';
import { Spinner } from 'reactstrap';
import styles from '../SearchResults.module.css';



class FetchSearchResults extends React.Component {


    shouldComponentUpdate (nextProps, nextState) {
        //we need to make deep comparisons to nested objects
        //nextProps include searchFilters, searchInfo objects

        console.log("this.props: ", this.props)
        console.log("----------------");
        console.log("nextProps: ", nextProps);

        let performUpdate = false;

        Object.keys(nextProps.searchInfo).forEach(filterId => { 
            if (nextProps.searchInfo[filterId] !== this.props.searchInfo[filterId])
            {
                // alert("reeeee");
                performUpdate = true;
                return;
            }
        });

        if (performUpdate)
        {
            return true;
        }

        Object.keys(nextProps.searchFilters).forEach(filterId => { 
            
            if (filterId === "facilities")
            {
                Object.keys(nextProps.searchFilters.facilities).forEach(facId => {
                    if (nextProps.searchFilters.facilities[facId] !== this.props.searchFilters.facilities[facId])
                    {
                        // alert("edw 1");
                        performUpdate = true;
                        return;
                    }
                });

                // if (performUpdate)
                // {
                //     return;
                // }
            }
            else
            {
                if (nextProps.searchFilters[filterId] !== this.props.searchFilters[filterId])
                {
                    // alert("edw 2");
                    performUpdate = true;
                    // return;
                }
            }

            if (performUpdate)
            {
                return;
            }

        });

        if (performUpdate)
        {
            return true;
        }
        else
        {
            // alert("edw 3");
            return false;
        }
        
    }

    render() {
        // alert("PALIII");
        console.log("-> Fetch Search Results rendering");
        console.log(this.props);
        return (
            <Get url="http://localhost:8765/app/api/search" params={{minPrice: this.props.searchFilters.minPrice,
                                                                    maxPrice: this.props.searchFilters.maxPrice,
                                                                    maxDist: this.props.searchFilters.maxDist,
                                                                    hasPool: this.props.searchFilters.facilities.pool,
                                                                    hasWifi: this.props.searchFilters.facilities.wifi,
                                                                    hasShauna: this.props.searchFilters.facilities.sauna,
                                                                    cityName: this.props.searchInfo.destination,
                                                                    people: this.props.searchInfo.adults,
                                                                    pointX: 53.430957,
                                                                    pointY: -2.960476}}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        const feedback = (
                            <Row className="justify-content-center">
                                <div className="text-muted align-self-center pointer" onClick={() => makeRequest({ params: { reload: true } })}> 
                                    Υπήρξε πρόβλημα με τη σύνδεση σας. Δοκιμάστε ξανά
                                    <i className="fas fa-redo-alt pointer ml-2"></i>
                                </div>
                            </Row>
                        );
                        return feedback;
                        // return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                    }
                    else if (isLoading) {
                        return (
                            <Row className="justify-content-center">
                                <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
                            </Row>
                        );
                    }
                    else if (response !== null) {
                        console.log(response);
                        // alert(response.data.data.results[0].id);
                        // response.data.data = null;
                        const noResults = (
                            <Row className={"justify-content-center p-4 " + styles.box_border}>
                                <div className="text-muted align-self-center"> Δεν βρέθηκαν αποτελέσματα. Δοκιμάστε ξανά εισάγοντας διαφορετικά στοιχεία αναζήτησης. </div>
                            </Row>
                        );

                        if ((response.data.data) && (response.data.data.results))
                        {
                            const rooms = response.data.data.results.map( room =>
                                <SearchResult 
                                    key={room.id}
                                    room={room}
                                    // bookRoomHandler={this.props.bookRoomHandler}
                                    bookRoomHandler={( event ) => this.props.bookRoomHandler( event, room, this.props.searchFilters, this.props.searchInfo )} 
                                />
                            );

                            if (rooms.length)
                            {
                                return rooms;
                            }
                            else
                            {
                                return noResults;
                            }
                        }
                        else
                        {
                            return noResults;
                        }
                    }

                    return null;
                }}
            </Get> 
        );
    }

}


export default withRouter(FetchSearchResults);