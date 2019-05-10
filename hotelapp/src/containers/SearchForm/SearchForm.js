import React from 'react';
import produce from 'immer';
import classes from './SearchForm.module.css';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
         InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
         DropdownMenu, DropdownItem } from 'reactstrap';
import SubmitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import DropDownUnit from '../../components/UI/SearchForm/DropDownUnit';


class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            dropdownOpen: false,
            dropdownUnits: {
                rooms: 1,
                adults: 1,
                children: 0
            },
        };
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
                            <Input type="text" className="form-control border-0 p-0 rm_hl" id="destination" placeholder="Που θα θέλατε να πάτε;"/> 
                        </InputGroup> 
                    </Col> 

                    <Col className={classes.search_border + " m-0 p-0"} xs="6" md="3" lg="auto"> 
                        <Label hidden for="date_from">Από</Label> 
                        <InputGroup> 
                            <InputGroupAddon addonType="prepend">                                         
                                <InputGroupText className="bg-transparent border-0 text-secondary">                                          
                                    <i className="far fa-calendar-alt"></i> 
                                    <span className="ml-3 font-weight-bold"> Από </span> 
                                </InputGroupText> 
                            </InputGroupAddon> 
                            <Input type="date" className="form-control border-0 p-0 rm_hl" id="date_from"/> 
                        </InputGroup> 
                    </Col> 

                    <Col className={classes.search_border + " m-0 p-0"} xs="6" md="3" lg="auto"> 
                        <Label hidden for="date_to">Έως</Label> 
                        <InputGroup> 
                            <InputGroupAddon addonType="prepend">                                         
                                <InputGroupText className="bg-transparent border-0 text-secondary">                                          
                                    <i className="far fa-calendar-alt"></i> 
                                    <span className="ml-3 font-weight-bold"> 'Εως </span> 
                                </InputGroupText> 
                            </InputGroupAddon> 
                            <Input type="date" className="form-control border-0 p-0 rm_hl" id="date_to"/> 
                        </InputGroup> 
                    </Col> 

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