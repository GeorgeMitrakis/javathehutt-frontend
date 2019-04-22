import React from 'react';
import classes from './SearchForm.module.css';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
         InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
         DropdownMenu, DropdownItem } from 'reactstrap';


class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Form> 
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
                                1 ενήλικας - 0 παιδιά {' '} 
                            </DropdownToggle> 
                            <DropdownMenu className="p-2"> 
                                <div className="d-flex align-items-center">                                                 
                                    <div className="pr-5"> 
                                        Δωμάτια 
                                    </div>  
                                    <div className="pr-3"> 
                                        <button className="form-control rm_hl"><i className="fas fa-minus"></i></button> 
                                    </div> 
                                    <div className="pr-3"> 
                                        26 
                                    </div> 
                                    <div className=""> 
                                        <button className="form-control rm_hl"><i className="fas fa-plus"></i></button> 
                                    </div> 
                                </div> 

                                <DropdownItem divider /> 

                                <Row className="align-items-center"> 
                                    <Col className="d-flex justify-content-start"> 
                                        Ενήλικες 
                                    </Col> 

                                    <Col className="d-flex justify-content-end">                                                 
                                        <button className="form-control rm_hl"><i className="fas fa-minus"></i></button> 
                                        <div className="pr-3 pl-3 align-self-center"> 
                                            28 
                                        </div> 
                                        <button className="form-control rm_hl"><i className="fas fa-plus"></i></button>                         
                                    </Col> 
                                </Row> 

                                <DropdownItem divider /> 

                                <Row className="align-items-center"> 
                                    <Col className="d-flex justify-content-start"> 
                                        Παιδιά 
                                    </Col> 

                                    <Col className="d-flex justify-content-end">                                                 
                                        <button className="form-control rm_hl"><i className="fas fa-minus"></i></button> 
                                        <div className="pr-3 pl-3 align-self-center"> 
                                            24 
                                        </div> 
                                        <button className="form-control rm_hl"><i className="fas fa-plus"></i></button>                         
                                    </Col> 
                                </Row> 

                            </DropdownMenu> 
                        </InputGroupButtonDropdown> 
                    </Col> 
                
                    <Col className={classes.search_border + " m-0 p-0"} xs="12" sm="6" md="3" lg="auto"> 
                        <button className="form-control  rounded-0 font-weight-bold rm_hl submit_btn">Αναζήτηση</button> 
                    </Col> 
                </FormGroup> 
            </Form> 
        ); 
    }



}

export default SearchForm;