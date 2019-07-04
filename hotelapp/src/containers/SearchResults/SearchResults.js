import React, { Component } from 'react';
import produce from 'immer';
import {  withRouter } from 'react-router-dom';
//import produce from 'immer';
import { Container, Col, Row, Modal } from 'reactstrap';

import styles from './SearchResults.module.css';
import { Get, Post } from 'react-axios';
import { createQueryParams, getQueryParams, todayIs, tomorrowIs, isLegitDate, cmpDates, checkValidity } from '../../Utility/Utility';
import SearchForm from '../SearchForm/SearchForm';
import FiltersTab from '../../components/Filters/FiltersTab';
import GoogleMapReact from 'google-map-react';
import { Spinner } from 'reactstrap';
import MediaQuery from 'react-responsive';
import FetchSearchResults from './FetchSearchResults/FetchSearchResults';


const searchFiltersDefaults = {
    pointX: null,
    pointY: null,
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
    startDate: todayIs(),
    endDate: tomorrowIs(),
    //rooms: 1,
    adults: 1,
    children: 0
}

//const numSearchInfo = ["rooms", "adults", "children"];
const numSearchInfo = ["adults", "children"];
const datesSearchInfo = ["startDate", "endDate"];


class SearchResults extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            filtersModal: false,
            mapModal: false,
            performSearchText: false,
            filtersMoved: false
        };
    
        this.filtersToggle = this.filtersToggle.bind(this);
        this.mapToggle = this.mapToggle.bind(this);

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        if (document.documentElement.clientWidth < 768)
        {
            return;
        }

        const windH = document.documentElement.clientHeight;
        const vh = window.pageYOffset / windH;
        
        if (!this.state.filtersMoved && (vh >= 0.2))
        {//move it
            // alert("move it");
            this.setState(
                produce(draft => {
                    draft.filtersMoved = true;
                })
            );
        }
        else if (this.state.filtersMoved && (vh < 0.2))
        {//phgaine to sthn arxikh 8esh
            // alert("phgaine to sthn arxikh 8esh");
            this.setState(
                produce(draft => {
                    draft.filtersMoved = false;
                })
            );
        }
        // console.log(window.pageYOffset);
    //   alert( window.scrollY);
    // do something like call `this.setState`
    // access window.scrollY etc
    }
    
    filtersToggle = () => {
        this.setState(prevState => ({
            filtersModal: !prevState.filtersModal
        }));
    }

    mapToggle = () => {
        this.setState(prevState => ({
            mapModal: !prevState.mapModal
        }));
    }
    

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

        if (cmpDates(searchInfo.startDate, searchInfo.endDate) >= 0)
        {
            searchInfo.startDate = searchInfoDefaults.startDate;
            searchInfo.endDate = searchInfoDefaults.endDate;
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
            else if ((filterId === "pointX") || (filterId === "pointY"))
            { //filter is coordinate
                if ((queryParams[filterId]) && (!isNaN(queryParams[filterId])))
                {
                    searchFilters[filterId] = Number(queryParams[filterId]);
                }
                else
                {
                    searchFilters[filterId] = searchFiltersDefaults[filterId];
                }
            }
            else if (filterId !== "searchText")
            { //filter is numeric
                if ((queryParams[filterId]) && (!isNaN(queryParams[filterId])) && (queryParams[filterId] >=0 ))
                {
                    searchFilters[filterId] = Number(queryParams[filterId]);
                }
                else
                {
                    searchFilters[filterId] = searchFiltersDefaults[filterId];
                }
            }
            else
            { //filter is searchText
                if (queryParams[filterId])
                {
                    searchFilters[filterId] = queryParams[filterId];
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
                //hotel_id: "123456",
                //...roomInfo,
				//...searchInfo,
				roomId : roomInfo.id,
				roomName : roomInfo.roomName,
				startDate : searchInfo.startDate,
				endDate : searchInfo.endDate,
				adults : searchInfo.adults,
				children : searchInfo.children,
				cityname : roomInfo.location.cityname,
				providername : roomInfo.provider.providername,
				price : roomInfo.price
			}
			console.log(params);
			console.log("\n=====\n");
			console.log(roomInfo);
			console.log("\n---__---\n");
			console.log(searchInfo);
			
			console.log("////////\n");
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

        // searchFilters.searchText = text;
        searchFilters = produce(searchFilters, draft => {
            draft.searchText = text;
        });
        console.log("changed searchText", searchFilters);
        this.updateURL(searchFilters, searchInfo);
	}
	
	handleEnterPress = (key, searchFilters, searchInfo) => {
		if(key===13){//enter pressed
			console.log("enter pressed", searchFilters);
			this.performSearchText(null, searchFilters, searchInfo);
		}		
	}

    performSearchText = (event, searchFilters, searchInfo) => {
        //toogle functionality
        const rules = {
            required: true,
            minLength: 4,
            maxLength: 30
        };

        const res = checkValidity(searchFilters.searchText, rules);
        if (!res.report)
        {
            // alert("NOT VALID");
            return;
        }

        this.setState(
            produce(draft => {
                draft.performSearchText = !draft.performSearchText;
            })
        );
    }

    handleCheckBoxChange = (label, searchFilters, searchInfo) => {
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

        // searchFilters.facilities[label] = !searchFilters.facilities[label];
        searchFilters = produce(searchFilters, draft => {
            draft.facilities[label] = !draft.facilities[label];
        });
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

        // searchFilters.minPrice = value[0];
        // searchFilters.maxPrice = value[1];
        searchFilters = produce(searchFilters, draft => {
            draft.minPrice = value[0];
            draft.maxPrice = value[1];
        });
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

        // searchFilters.maxDist = value;
        searchFilters = produce(searchFilters, draft => {
            draft.maxDist = value;
        });
        console.log(searchFilters);
        this.updateURL(searchFilters, searchInfo);
    };

    showFiltersHandler = () => {
        // alert("filters");
        this.filtersToggle();
    }

    mapClickedHandler = (mapProps, searchFilters, searchInfo) => {
    
        if (!this.state.mapModal)
        {
            // alert("anoigw to map")
            this.mapToggle();
            return;
        }

        // alert("o xarths einai anoixtos")

         console.log("------>apo to maps")
        console.log(mapProps)
        console.log("----------")


        searchFilters = produce(searchFilters, draft => {
            draft.pointX = mapProps.lat;
            draft.pointY = mapProps.lng;
        });


        console.log("---->changed Geo Search", searchFilters);
        this.updateURL(searchFilters, searchInfo);       
    }

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

        const filtersTab = (<FiltersTab  
                                handlePriceRangeChange = {this.handlePriceRangeChange}
                                handleAreaRangeChange = {this.handleAreaRangeChange}
								handleSearchText = {this.handleSearchText}
								handleEnterPress = {this.handleEnterPress}
                                performSearchText = {this.performSearchText}
                                handleCheckBoxChange = {this.handleCheckBoxChange}

                                searchFilters = {searchFilters}
                                searchInfo = {searchInfo}
                            />);

        const googleMap =  (<GoogleMapReact
                                onClick={ (e) => this.mapClickedHandler(e, searchFilters, searchInfo)}
                                bootstrapURLKeys={{ key: "AIzaSyDzbz3N1cN0rLnP3WVa2lSkDWJ8uSIj2pA" }}
                                defaultCenter={{
                                    lat: 53.430957,
                                    lng: -2.960476
                                }}
                                defaultZoom={11}
                            >
                            {/* <p> "My Marker" </p> */}
                            </GoogleMapReact>
                            );

        let sideFiltersStyles;
        if (this.state.filtersMoved)
        {
            sideFiltersStyles = {
                top: "15vh"
            }
        }
        else
        {
            sideFiltersStyles = {};
        }

        return (
            <>
            <Container fluid className={styles.main_content}>
                <Row>
                    <Col md="1"></Col> 
                    <Col xs="12" md="10">
                        <Row className="justify-content-center pr-3 pl-3" >
                            <SearchForm searchInfo={searchInfo} searchFilters={searchFilters} className={styles.search_border}/>
                        </Row>
                    </Col>

                    <Col xs="12" style={{fontSize: "25px", color: "gray"}} className="d-md-none p-0 m-0">      
                        <MediaQuery maxWidth={767}>
                            <i className="fas fa-filter float-right pointer" onClick={this.showFiltersHandler}></i>
                            <i className="fas fa-map-marked-alt float-right pointer mr-4" onClick={this.mapToggle}></i>              
                        </MediaQuery>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <MediaQuery minWidth={768}>
                        <div style={sideFiltersStyles} className={styles.side_filters}>
                            <div className={styles.rm_scrollbar}>
                                <Row>
                                    {filtersTab}
                                </Row>

                                <Row className="mt-3 mb-3" style={{height: "200px"}}>
                                    {googleMap}
                                </Row>
                            </div>
                        </div>
                    </MediaQuery>

                    <Col md="4" lg="4"> </Col>
                    <Col xs="12" md="8" lg="7">

                        <FetchSearchResults
                            performSearchText={this.state.performSearchText}
                            bookRoomHandler={this.bookRoomHandler}
                            searchFilters={searchFilters}
                            searchInfo={searchInfo}
                        />
                        
                    </Col>
                </Row>
            </Container> 

            <MediaQuery maxWidth={767}>
                <Modal className="modal-sm" centered fade isOpen={this.state.filtersModal} toggle={this.filtersToggle} >
                    {filtersTab}
                </Modal>
            </MediaQuery>

            <Modal className="modal-lg" centered fade isOpen={this.state.mapModal} toggle={this.mapToggle} >
                <div className={styles.box_border} style={{height: "75vh"}}>
                    {googleMap}
                </div>
            </Modal>

            </>

        );
    }

}


export default withRouter(SearchResults);