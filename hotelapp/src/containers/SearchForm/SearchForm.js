import React from 'react';
import produce from 'immer';
import classes from './SearchForm.module.css';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
         InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
         DropdownMenu, DropdownItem } from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import DropDownUnit from '../../components/UI/SearchForm/DropDownUnit';
import DateCalendar from '../../components/UI/SearchForm/DateCalendar';
// import SearchResults from '../SearchResults';


class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        const fulldate = this.todayIs();
        this.state = {
            searchText: "",
            fromDate: this.todayIs(),
            toDate: this.todayIs(),
            dropdownOpen: false,
            dropdownUnits: {
                rooms: 1,
                adults: 1,
                children: 0
            },
        };

        //console.log(this.constructFromDate());
    }

    handleSearchText(event) {
        this.insertSearchText((event.target.value));//the things I do for an immutable state...
    }

    insertSearchText(text){
        this.setState(
            produce(draft => {
                draft.searchText = text;//this happens because event.target is not visible from draft
            })
        );
    }


    //the method below returns the current date in form "YYYY-MM-DD"
    todayIs(){
        let initialdate = new Date();
        let fulldate = "";
        fulldate  = fulldate  + initialdate.getFullYear() +"-";
        if(initialdate.getMonth()+1<10)
            fulldate  = fulldate  + "0";
        fulldate  = fulldate  +  (initialdate.getMonth()+1) +"-";
        if(initialdate.getDate()<10)
            fulldate  = fulldate  + "0";
        fulldate  = fulldate  +  initialdate.getDate();

        return fulldate;
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

    increaseUnit(unit) {
        this.setState(
            produce(draft => {
                draft.dropdownUnits[unit] = this.state.dropdownUnits[unit]+1;
            })
        );
    }

    decreaseUnit(unit) {
        this.setState(
            produce(draft => {
                draft.dropdownUnits[unit] = this.state.dropdownUnits[unit] >0 ? this.state.dropdownUnits[unit]-1 : 0;
            })
        );
    }

    //this method applies default values to the form fields if they are empty before submission
    // setDefaultsIfEmpty(){
    //     if(this.state.fromDate == ""){
    //         this.setState(
    //             produce(draft => {
    //                 draft.fromDate = this.todayIs();
    //             })
    //         );
    //     }
    // }

    submitForm = (event) => {
        event.preventDefault();
        //this.setDefaultsIfEmpty();
        this.props.history.push("/results");
        console.log(this.state);
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
                                placeholder="Που θα θέλατε να πάτε;"
                                onChange={this.handleSearchText.bind(this)}//save change in searched text to state
                            />
                        </InputGroup> 
                    </Col>

                    <DateCalendar
                        search_border={classes.search_border}
                        id={"date_from"}
                        text={"Από"}

                        //room booking can only start from today
                        min={this.todayIs()}

                        //stay starting date
                        value={this.state.fromDate}

                        //binds date inserted to state
                        change={this.handleDate.bind(this, 'fromDate')}


                    />


                    <DateCalendar
                        search_border={classes.search_border}
                        id={"date_to"}
                        text={"Έως"}

                        //room booking can only end after the starting date
                        min={this.state.fromDate}

                        //stay ending date
                        value={this.state.toDate}

                        //binds date inserted to state
                        change={this.handleDate.bind(this, 'toDate')}
                    />


                    <Col className={classes.search_border + " m-0 p-0"} xs="12" sm="6" md="3" lg="auto"> 
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}> 
                            <DropdownToggle caret className="rounded-0 bg-transparent border-0 text-secondary rm_hl"> 
                                <i className="fas fa-user mr-3"></i>
                                {this.state.dropdownUnits.adults} ενήλικες - {this.state.dropdownUnits.children} παιδιά {' '}
                            </DropdownToggle> 
                            <DropdownMenu className="p-2">

                                <DropDownUnit
                                    unitName={"Δωμάτια"}
                                    unitAmount={this.state.dropdownUnits.rooms}
                                    dec={this.decreaseUnit.bind(this, 'rooms')}
                                    inc={this.increaseUnit.bind(this, 'rooms')}
                                />

                                <DropdownItem divider />

                                <DropDownUnit
                                    unitName={"Ενήλικες"}
                                    unitAmount={this.state.dropdownUnits.adults}
                                    dec={this.decreaseUnit.bind(this, 'adults')}
                                    inc={this.increaseUnit.bind(this, 'adults')}
                                />

                                <DropdownItem divider />

                                <DropDownUnit
                                    unitName={"Παιδιά"}
                                    nameMargin={"mr-3"}
                                    unitAmount={this.state.dropdownUnits.children}
                                    dec={this.decreaseUnit.bind(this, 'children')}
                                    inc={this.increaseUnit.bind(this, 'children')}
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

export default SearchForm;