import React from 'react';
import { withRouter } from 'react-router-dom';
import produce from 'immer';
import classes from './SearchForm.module.css';
import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
         InputGroupText, InputGroupButtonDropdown, DropdownToggle,
         DropdownMenu, DropdownItem } from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import DropDownUnit from '../../components/SearchForm/DropDownUnit';
import DateCalendar from '../../components/SearchForm/DateCalendar';
// import SearchResults from '../SearchResults';
import { createQueryParams, todayIs, tomorrowIs, nextDayIs } from '../../Utility/Utility';


class SearchForm extends React.Component {

    constructor(props) {
        super(props);

		this.toggleDropDown = this.toggleDropDown.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		//used only for input focus on homepage 
		this.textInputRef = React.createRef();

        this.state = {
            searchText: !this.props.searchInfo ? "" : this.props.searchInfo.destination,
            startDate: !this.props.searchInfo ? todayIs() : this.props.searchInfo.startDate,
            endDate: !this.props.searchInfo ? tomorrowIs() : this.props.searchInfo.endDate,
            dropdownOpen: false,
            dropdownUnits: !this.props.searchInfo ? 
                {
                    // rooms: 1,
                    adults: 1,
                    children: 0
                } 
                : 
                {
                    //rooms: this.props.searchInfo.rooms,
                    adults: this.props.searchInfo.adults,
                    children: this.props.searchInfo.children
                }
        };

        //console.log(this.constructFromDate());
	}
	
	componentDidMount(){
		//console.log(this.props.location.pathname );
		if(this.props.location.pathname === "/"){
			this.textInputRef.current.focus();
		}
	}

    handleSearchText(event) {
		console.log(event);
		console.log(event.target);
		console.log(event.target.value);
		let text = event.target.value;
		
		this.setState(
            produce(draft => {
                draft.searchText = text;
            })
        );
    }

    handleDate(date_index, event){
        let d = event.target.value;
        this.setState(
            produce(draft => {
                draft[date_index] = d;
            })
        );
    }



    toggleDropDown() {
        this.setState(
            produce(draft => {
                draft.dropdownOpen = !this.state.dropdownOpen;
            })
        );
    }

    increaseUnit(event, unit) {
        event.preventDefault();

        this.setState(
            produce(draft => {
                draft.dropdownUnits[unit] = this.state.dropdownUnits[unit]+1;
            })
        );
    }

    decreaseUnit(event, unit) {
        event.preventDefault();

        // if ((unit === "rooms") && (this.state.dropdownUnits.rooms === 1))
        // {
        //     return;
        // }

        if ((unit === "adults") && (this.state.dropdownUnits.adults === 1)){
            return;
        }

        if ((unit === "children") && (this.state.dropdownUnits.children === 0)){
            return;
        }

        this.setState(
            produce(draft => {
                draft.dropdownUnits[unit] -= 1;
            })
        );
    }

	
    submitForm = (event) => {
		event.preventDefault();		
		this.handleRedirect();
		
	}
	handleKeyPress = (key) => {
		if(key===13){//enter pressed
			this.handleRedirect();
		}
	}

	handleRedirect(){

        //this.setDefaultsIfEmpty();
        let params = {};
        params["destination"] = this.state.searchText;
        params["startDate"] = this.state.startDate; 
        params["endDate"] = this.state.endDate; 
        // params["rooms"] = this.state.dropdownUnits.rooms;
        params["adults"] = this.state.dropdownUnits.adults;
        params["children"] = this.state.dropdownUnits.children;

        if (this.props.searchFilters)
        {
            params = {
                ...params,
                ...this.props.searchFilters,
                ...this.props.searchFilters.facilities 
            };

            delete params.facilities;
        }

        const queryParams = createQueryParams(params);
        console.log("Inside SearchForm. About to redirect to: /searchresults?" + queryParams);
        // console.log(queryParams);
        // console.log(getQueryParams(queryParams));
        // return;

        this.props.history.push("/searchresults?" + queryParams);
	}

	

    render() {
        return (
            <Form onSubmit={this.submitForm}> 
                <FormGroup row> 
                    <Col className={classes.search_border + " m-0 p-0"} xs="12" lg="auto"> 
                        <Label hidden for="destination">Destination</Label> 
                        <InputGroup> 
                            <InputGroupAddon addonType="prepend">                                         
                                <InputGroupText className="bg-transparent border-0 text-secondary">                                          
                                    <i className="fas fa-bed"></i> 
                                </InputGroupText> 
                            </InputGroupAddon> 
                            <Input
                                type="text"
                                className="form-control border-0 p-0 rm_hl"
                                id="destination"
                                placeholder="Που θέλετε να πάτε;"
                                value={this.state.searchText}
                                onChange={this.handleSearchText.bind(this)}//save change in searched text to state
								onKeyPress={(value) => this.handleKeyPress(value.charCode)}
						   		innerRef={this.textInputRef}
						   />
                        </InputGroup> 
                    </Col>

                    <DateCalendar
                        search_border={classes.search_border}
                        id={"date_from"}
                        text={"Από"}

                        //room booking can only start from today
                        min={todayIs()}

                        //stay starting date
                        value={this.state.startDate}

                        //binds date inserted to state
						change={this.handleDate.bind(this, 'startDate')}
						



                    />


                    <DateCalendar
                        search_border={classes.search_border}
                        id={"date_to"}
                        text={"Έως"}

                        //room booking can only end after the starting date
                        min={nextDayIs(this.state.startDate)}

                        //stay ending date
                        value={this.state.endDate}

                        //binds date inserted to state
						change={this.handleDate.bind(this, 'endDate')}
						

                    />


                    <Col className={classes.search_border + " m-0 p-0"} xs="12" sm="6" md="3" lg="auto"> 
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}> 
                            <DropdownToggle caret className="rounded-0 bg-transparent border-0 text-secondary rm_hl"> 
                                <i className="fas fa-user mr-3"></i>
                                {this.state.dropdownUnits.adults} ενήλικες - {this.state.dropdownUnits.children} παιδιά {' '}
                            </DropdownToggle> 
                            <DropdownMenu className="p-2">

                                {/* <DropDownUnit
                                    unitName={"Δωμάτια"}
                                    unitAmount={this.state.dropdownUnits.rooms}
                                    inc={( event ) => this.increaseUnit( event, 'rooms' )} 
                                    dec={( event ) => this.decreaseUnit( event, 'rooms' )}
                                />

                                <DropdownItem divider /> */}

                                <DropDownUnit
                                    unitName={"Ενήλικες"}
                                    unitAmount={this.state.dropdownUnits.adults}
                                    inc={( event ) => this.increaseUnit( event, 'adults' )} 
                                    dec={( event ) => this.decreaseUnit( event, 'adults' )}
                                />

                                <DropdownItem divider />

                                <DropDownUnit
                                    unitName={"Παιδιά"}
                                    nameMargin={"mr-3"}
                                    unitAmount={this.state.dropdownUnits.children}
                                    inc={( event ) => this.increaseUnit( event, 'children' )} 
                                    dec={( event ) => this.decreaseUnit( event, 'children' )}
                                />

                            </DropdownMenu> 
                        </InputGroupButtonDropdown> 
                    </Col> 
                
                    <Col className={classes.search_border + " m-0 p-0"} xs="12" sm="6" md="3" lg="auto"> 
                        {/* <button className="form-control  rounded-0 font-weight-bold rm_hl submit_btn">Αναζήτηση</button>  */}
                        <SubmitBtn classes="form-control rounded-0" borderWidth="2px">
                            Αναζήτηση
                        </SubmitBtn>
                    </Col>
                    {/*<Row className="justify-content-center mr-2 ml-2 mt-5">*/}
                        {/*<SearchResults/>*/}
                    {/*</Row>*/}
                </FormGroup> 
            </Form> 
        ); 
    }



}

export default withRouter(SearchForm);