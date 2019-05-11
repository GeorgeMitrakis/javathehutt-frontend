import React from 'react';
import produce from 'immer';
import classes from './SearchForm.module.css';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
         InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
         DropdownMenu, DropdownItem } from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import DropDownUnit from '../../components/UI/SearchForm/DropDownUnit';
import DateCalendar from '../../components/UI/SearchForm/DateCalendar';


class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        const initialdate = new Date();
        this.state = {
            searchText: "",
            fromDate:{
                month: initialdate.getMonth()+1,
                day: initialdate.getDate(),
                year: initialdate.getFullYear(),
                //full: initialdate.getFullYear()+ "-" + (initialdate.getMonth()+1) + "-" + initialdate.getDate()
            },
            toDate:{
                month: initialdate.getMonth()+1,
                day: initialdate.getDate(),
                year: initialdate.getFullYear()
                //full: initialdate.getFullYear()+ "-" + (initialdate.getMonth()+1) + "-" + initialdate.getDate()
            },
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


    constructFromDate = () => {
        var fulldate="";
        fulldate = fulldate + this.state.fromDate.year+"-";
        if(this.state.fromDate.month<10)
            fulldate = fulldate + "0";
        fulldate = fulldate +  this.state.fromDate.month+"-";
        if(this.state.fromDate.day<10)
            fulldate = fulldate + "0";
        fulldate = fulldate +  this.state.fromDate.day;

        return fulldate;
    }


    handleFromDate(event){
        let d = new Date(event.target.value);
        this.setState(
            produce(draft => {
                draft.fromDate.year = d.getFullYear();
            })
        );

        this.setState(
            produce(draft => {
                draft.fromDate.month = d.getMonth()+1;
            })
        );

        this.setState(
            produce(draft => {
                draft.fromDate.day = d.getDate();
            })
        );
    }

    handleToDate(event){
        let d = new Date(event.target.value);
        this.setState(
            produce(draft => {
                draft.toDate.year = d.getFullYear();
            })
        );

        this.setState(
            produce(draft => {
                draft.toDate.month = d.getMonth()+1;
            })
        );

        this.setState(
            produce(draft => {
                draft.toDate.day = d.getDate();
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

    submitForm = (event) => {
        event.preventDefault();
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

                        //values passed for date entry
                        year={this.state.fromDate.year}
                        month={this.state.fromDate.month}
                        day={this.state.fromDate.day}

                        //values passed for earliest date entry
                        inityear={()=> new Date().getFullYear()}
                        initmonth={()=> {return ((new Date()).getMonth()+1)}}
                        initday={()=> new Date().getDay()}

                        //binds date inserted to state
                        change={this.handleFromDate.bind(this)}


                    />


                    <DateCalendar
                        search_border={classes.search_border}
                        id={"date_to"}
                        text={"Έως"}

                        //values passed for earliest date entry
                        year={this.state.toDate.year}
                        month={this.state.toDate.month}
                        day={this.state.toDate.day}

                        //values passed for earliest date entry
                        inityear={this.state.fromDate.year}
                        initmonth={this.state.fromDate.month}
                        initday={this.state.fromDate.day}

                        //binds date inserted to state
                        change={this.handleToDate.bind(this)}
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
                </FormGroup> 
            </Form> 
        ); 
    }



}

export default SearchForm;